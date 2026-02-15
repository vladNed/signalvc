import argparse
import json
import pathlib

import pandas as pd
from rich import console, prompt, status
from sqlalchemy import create_engine

from api.conf import settings

log = console.Console()


def parse_target_markets(val: str) -> str:
    """Parse target markets from a string to a JSON array to be added to JSONB"""
    if pd.isna(val):
        return json.dumps([])

    stripped_val = val.strip().lower()
    return json.dumps(
        [market.strip() for market in stripped_val.split("|") if market.strip()]
    )


def parse_year_founded(val):
    """Parse a year value and return an int or pandas' NA for missing/unparseable values.

    pandas will upcast mixed int/None results to float if Python `None` is used.
    Returning `pd.NA` allows later casting to the nullable integer dtype `Int64`.
    """
    try:
        # Treat pandas NA / NaN as missing
        if pd.isna(val):
            return None

        # Some values may be float (e.g. 1999.0) or strings; cast via float then int
        return int(float(val))
    except (ValueError, TypeError):
        return None


def main():
    log.print("=== [bold green]VC Data Appender[/bold green] ===\n")

    parser = argparse.ArgumentParser(
        description="Append Veridion data to Supabase database."
    )
    parser.add_argument(
        "table", type=str, help="The target table name to append data to."
    )
    args = parser.parse_args()

    root = pathlib.Path(".")

    with status.Status(
        f"Searching for [bold blue]{args.table}[/bold blue] data file...", console=log
    ):
        parquet_file = root / "data" / f"{args.table}.parquet"
        csv_file = root / "data" / f"{args.table}.csv"

        if parquet_file.exists():
            data_file = parquet_file
            data_format = "parquet"
        elif csv_file.exists():
            data_file = csv_file
            data_format = "csv"
        else:
            log.print(
                f"[bold red]Error:[/bold red] Data file not found. Expected one of:\n"
                f"  - {parquet_file}\n"
                f"  - {csv_file}"
            )
            return

    with status.Status("Reading file...", console=log):
        if data_format == "parquet":
            df = pd.read_parquet(data_file, engine="pyarrow")
        else:
            df = pd.read_csv(data_file)

    log.print("▶ Loaded data:")
    log.print(f"  - Rows: {len(df)}")
    log.print(f"  - Columns: {df.columns.tolist()}")
    log.print(
        f"  - Memory usage: {df.memory_usage(deep=True).sum() / (1024**2):.4f} MB\n"
    )

    ask = prompt.Prompt.ask(
        f"Append data to table [bold blue]{args.table}[/bold blue]?",
        choices=["y", "n"],
        default="n",
    )

    if ask.lower() != "y":
        log.print("❌ Operation cancelled by user.")
        return

    with status.Status("Connecting to Supabase...", console=log):
        engine = create_engine(settings.postgres.url)
    log.print("▶ Connected to [bold green]Supabase[/bold green] database !!\n")

    with status.Status("Adding data to Supabase...", console=log):
        with engine.begin() as conn:
            df.to_sql(
                name=args.table,
                con=conn,
                if_exists="append",
                index=False,
                method="multi",
                chunksize=10000,
            )

    log.print("\n✅ [bold green]Data successfully added to Supabase![/bold green]")
