"""Generate sample startup-investor relationship data."""

import argparse
import asyncio
import csv
import os
import random
import sys
import uuid
from datetime import datetime, timedelta
from pathlib import Path

import asyncpg


def load_csv_ids(file_path: str, id_column: str = "id") -> list[str]:
    """Load IDs from a CSV file."""
    ids = []
    with open(file_path, "r") as f:
        reader = csv.DictReader(f)
        for row in reader:
            ids.append(row[id_column])
    return ids


async def load_startup_ids_from_db() -> list[str]:
    """Load startup IDs from the database."""
    # Build connection string from environment variables
    db_url = f"postgresql://{os.getenv('POSTGRES__USER')}:{os.getenv('POSTGRES__PASSWORD')}@{os.getenv('POSTGRES__HOST', 'localhost')}:5432/{os.getenv('POSTGRES__DB')}"

    try:
        conn = await asyncpg.connect(db_url)
        print("✅ Connected to database")

        # Fetch all startup IDs
        rows = await conn.fetch("SELECT id FROM startup")
        startup_ids = [str(row["id"]) for row in rows]

        await conn.close()
        print(f"✅ Loaded {len(startup_ids)} startup IDs from database")
        return startup_ids
    except Exception as e:
        print(f"❌ Error connecting to database: {e}")
        print(
            "Make sure to set environment variables: POSTGRES__USER, POSTGRES__PASSWORD, POSTGRES__HOST, POSTGRES__DB"
        )
        sys.exit(1)


def generate_valuation(stage: str) -> tuple[int, int]:
    """
    Generate entry and current valuations based on startup stage.

    Returns: (entry_valuation, current_valuation) in USD
    """
    valuations = {
        "seed": (1_000_000, 5_000_000),
        "series_a": (5_000_000, 15_000_000),
        "series_b": (15_000_000, 50_000_000),
        "series_c": (50_000_000, 150_000_000),
        "growth": (150_000_000, 500_000_000),
    }

    # Randomly select a stage
    stage = random.choice(list(valuations.keys()))
    min_val, max_val = valuations[stage]

    entry_val = random.randint(min_val, max_val)
    # Current valuation is between 0.5x to 5x entry (some fail, some succeed)
    growth_factor = random.uniform(0.5, 5.0)
    current_val = int(entry_val * growth_factor)

    return entry_val, current_val


def generate_ticket_size(
    entry_valuation: int, current_valuation: int
) -> tuple[int, int]:
    """
    Generate entry and current ticket sizes based on valuations.

    Typically investors own 10-30% at entry.
    Returns: (entry_ticket, current_ticket) in USD
    """
    ownership_pct = random.uniform(0.05, 0.25)  # 5-25% ownership
    entry_ticket = int(entry_valuation * ownership_pct)
    current_ticket = int(current_valuation * ownership_pct)

    return entry_ticket, current_ticket


def generate_investment_date() -> str:
    """Generate a random investment date in the last 5 years."""
    days_ago = random.randint(0, 1825)  # 5 years
    date = datetime.now() - timedelta(days=days_ago)
    return date.strftime("%Y-%m-%d")


async def main_async():
    """Generate startup-investor relationships."""
    # Paths
    base_path = Path(__file__).parent.parent.parent
    investor_csv = base_path / "investor_rows.csv"
    output_csv = base_path / "startup_investor_rows.csv"

    # Load investor IDs from CSV
    investor_ids = load_csv_ids(str(investor_csv))
    print(f"✅ Loaded {len(investor_ids)} investors from CSV")

    # Load startup IDs from database
    startup_ids = await load_startup_ids_from_db()

    # For 580k startups, you may want to sample to avoid generating too many relationships
    # Uncomment one of these options:

    # Option 1: Use first N startups
    # startup_ids = startup_ids[:1000]

    # Option 2: Random sample
    # import random
    # startup_ids = random.sample(startup_ids, min(1000, len(startup_ids)))

    # Option 3: Use all (will generate 580k-1.7M relationships!)
    # startup_ids = startup_ids

    print(f"📊 Using {len(startup_ids)} startups")
    print(
        f"⚠️  Will generate approximately {len(startup_ids) * 2} relationships (1-3 investors per startup)"
    )

    # Confirm if processing large dataset
    if len(startup_ids) > 10000:
        response = input(
            f"\n⚠️  You're about to generate relationships for {len(startup_ids)} startups. Continue? (y/n): "
        )
        if response.lower() != "y":
            print("Cancelled.")
            return

    # Generate relationships
    relationships = []

    for startup_id in startup_ids:
        # Each startup gets 1-3 investors
        num_investors = random.randint(1, 3)
        selected_investors = random.sample(
            investor_ids, min(num_investors, len(investor_ids))
        )

        for investor_id in selected_investors:
            entry_val, current_val = generate_valuation("random")
            entry_ticket, current_ticket = generate_ticket_size(entry_val, current_val)
            investment_date = generate_investment_date()

            relationships.append(
                {
                    "id": str(uuid.uuid4()),
                    "startup_id": startup_id,
                    "investor_id": investor_id,
                    "entry_valuation_usd": entry_val,
                    "current_valuation_usd": current_val,
                    "entry_ticket_size_usd": entry_ticket,
                    "current_ticket_size_usd": current_ticket,
                    "investment_date": investment_date,
                    "created_at": datetime.now().isoformat(),
                }
            )

    # Write to CSV
    with open(output_csv, "w", newline="") as f:
        if relationships:
            writer = csv.DictWriter(f, fieldnames=relationships[0].keys())
            writer.writeheader()
            writer.writerows(relationships)

    print(f"Generated {len(relationships)} startup-investor relationships")
    print(f"Output written to: {output_csv}")

    # Print some statistics
    print("\n=== Statistics ===")
    avg_entry_val = sum(r["entry_valuation_usd"] for r in relationships) / len(
        relationships
    )
    avg_current_val = sum(r["current_valuation_usd"] for r in relationships) / len(
        relationships
    )
    avg_entry_ticket = sum(r["entry_ticket_size_usd"] for r in relationships) / len(
        relationships
    )
    avg_current_ticket = sum(r["current_ticket_size_usd"] for r in relationships) / len(
        relationships
    )

    print(f"Average entry valuation: ${avg_entry_val:,.0f}")
    print(f"Average current valuation: ${avg_current_val:,.0f}")
    print(f"Average entry ticket: ${avg_entry_ticket:,.0f}")
    print(f"Average growth multiple: {avg_current_val / avg_entry_val:.2f}x")


def main():
    """Entry point for the script."""
    asyncio.run(main_async())


if __name__ == "__main__":
    main()
