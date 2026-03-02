"""Generate startup financial data (ARR, founder, funding_size) for all startups."""

import asyncio
import hashlib
import json
import os
import sys
from pathlib import Path

import asyncpg

# Deterministic name pools (seeded by startup UUID hash)
FIRST_NAMES = [
    "James", "Mary", "Robert", "Patricia", "John", "Jennifer", "Michael", "Linda",
    "David", "Elizabeth", "William", "Barbara", "Richard", "Susan", "Joseph", "Jessica",
    "Thomas", "Sarah", "Christopher", "Karen", "Charles", "Lisa", "Daniel", "Nancy",
    "Matthew", "Betty", "Anthony", "Margaret", "Mark", "Sandra", "Donald", "Ashley",
    "Steven", "Kimberly", "Paul", "Emily", "Andrew", "Donna", "Joshua", "Michelle",
    "Kenneth", "Carol", "Kevin", "Amanda", "Brian", "Dorothy", "George", "Melissa",
    "Timothy", "Deborah",
]

LAST_NAMES = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
    "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson",
    "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson",
    "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker",
    "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
    "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell",
    "Carter", "Roberts",
]

# ARR per employee by business category (USD)
ARR_PER_EMPLOYEE = {
    "saas": 200_000,
    "software": 200_000,
    "technology": 180_000,
    "fintech": 190_000,
    "health": 120_000,
    "healthcare": 120_000,
    "biotech": 100_000,
    "ecommerce": 150_000,
    "e-commerce": 150_000,
    "retail": 90_000,
    "manufacturing": 70_000,
    "education": 80_000,
    "energy": 110_000,
    "logistics": 85_000,
    "media": 130_000,
    "gaming": 160_000,
    "food": 75_000,
    "agriculture": 65_000,
    "real estate": 100_000,
    "consulting": 140_000,
    "cybersecurity": 210_000,
    "ai": 220_000,
    "artificial intelligence": 220_000,
}

DEFAULT_ARR_PER_EMPLOYEE = 120_000


def hash_uuid(uuid_str: str) -> int:
    """Get a deterministic integer hash from a UUID string."""
    return int(hashlib.sha256(uuid_str.encode()).hexdigest(), 16)


def generate_founder(startup_id: str) -> str:
    """Generate a deterministic founder name from startup UUID."""
    h = hash_uuid(startup_id)
    first = FIRST_NAMES[h % len(FIRST_NAMES)]
    last = LAST_NAMES[(h // len(FIRST_NAMES)) % len(LAST_NAMES)]
    return f"{first} {last}"


def get_arr_per_employee(category: str | None) -> int:
    """Get ARR per employee for a business category."""
    if not category:
        return DEFAULT_ARR_PER_EMPLOYEE
    cat_lower = category.lower().strip()
    for key, value in ARR_PER_EMPLOYEE.items():
        if key in cat_lower:
            return value
    return DEFAULT_ARR_PER_EMPLOYEE


def get_maturity_factor(founded_year: int | None) -> float:
    """Get maturity factor based on founding year. Older = more mature = higher revenue."""
    if not founded_year:
        return 1.0
    age = 2026 - founded_year
    if age <= 1:
        return 0.3
    elif age <= 3:
        return 0.6
    elif age <= 5:
        return 1.0
    elif age <= 10:
        return 1.5
    else:
        return 2.0


def generate_arr(
    startup_id: str,
    employee_count: int | None,
    founded_year: int | None,
    category: str | None,
) -> int:
    """Generate ARR based on employee count, category, and maturity."""
    h = hash_uuid(startup_id)

    employees = employee_count if employee_count and employee_count > 0 else 10
    arr_per_emp = get_arr_per_employee(category)
    maturity = get_maturity_factor(founded_year)

    base_arr = employees * arr_per_emp * maturity

    # Deterministic jitter +/-30% based on UUID hash
    jitter_seed = ((h >> 64) % 10000) / 10000.0  # 0.0 to 1.0
    jitter = 0.7 + (jitter_seed * 0.6)  # 0.7 to 1.3

    return max(int(base_arr * jitter), 50_000)  # Floor at $50K


def generate_funding_size(startup_id: str, arr: int, founded_year: int | None) -> int:
    """Generate funding size based on ARR and stage."""
    h = hash_uuid(startup_id)

    age = (2026 - founded_year) if founded_year else 5

    # Stage-dependent ratio of funding to ARR
    if age <= 2:
        # Early stage: higher funding ratio (2-5x ARR)
        ratio_min, ratio_max = 2.0, 5.0
    elif age <= 5:
        # Growth stage (1-3x ARR)
        ratio_min, ratio_max = 1.0, 3.0
    else:
        # Mature (0.5-2x ARR)
        ratio_min, ratio_max = 0.5, 2.0

    # Deterministic ratio from UUID hash
    ratio_seed = ((h >> 128) % 10000) / 10000.0
    ratio = ratio_min + (ratio_seed * (ratio_max - ratio_min))

    funding = arr * ratio

    # Round to nearest $100K
    funding_rounded = round(funding / 100_000) * 100_000

    return max(funding_rounded, 100_000)  # Floor at $100K


BATCH_SIZE = 5_000
CURSOR_FILE = Path(__file__).parent / ".financials_cursor.json"


def load_cursor() -> int:
    """Load the last successfully processed offset from disk."""
    if CURSOR_FILE.exists():
        data = json.loads(CURSOR_FILE.read_text())
        offset = data.get("offset", 0)
        print(f"Resuming from cursor: offset={offset}")
        return offset
    return 0


def save_cursor(offset: int) -> None:
    """Save current offset to disk after each successful batch."""
    CURSOR_FILE.write_text(json.dumps({"offset": offset}))


def clear_cursor() -> None:
    """Remove cursor file after successful completion."""
    if CURSOR_FILE.exists():
        CURSOR_FILE.unlink()
        print("Cursor file cleared.")


async def main():
    """Main entry point."""
    db_url = (
        f"postgresql://{os.getenv('POSTGRES__USER')}:{os.getenv('POSTGRES__PASSWORD')}"
        f"@{os.getenv('POSTGRES__HOST', 'localhost')}:5432/{os.getenv('POSTGRES__DB')}"
    )

    try:
        conn = await asyncpg.connect(db_url)
        print("Connected to database")
    except Exception as e:
        print(f"Error connecting to database: {e}")
        print("Set environment variables: POSTGRES__USER, POSTGRES__PASSWORD, POSTGRES__HOST, POSTGRES__DB")
        sys.exit(1)

    try:
        total_count = await conn.fetchval("SELECT count(*) FROM startup")
        print(f"Total startups: {total_count}")

        if not total_count:
            print("No startups found. Exiting.")
            return

        offset = load_cursor()
        total = offset
        arr_sum = 0
        funding_sum = 0

        while offset < total_count:
            rows = await conn.fetch(
                "SELECT id, employee_count, founded_year, business_category "
                "FROM startup ORDER BY id LIMIT $1 OFFSET $2",
                BATCH_SIZE, offset,
            )
            if not rows:
                break

            batch = []
            for row in rows:
                sid = str(row["id"])
                founder = generate_founder(sid)
                arr = generate_arr(
                    sid,
                    row["employee_count"],
                    row["founded_year"],
                    row["business_category"],
                )
                funding = generate_funding_size(sid, arr, row["founded_year"])
                batch.append((arr, founder, funding, row["id"]))
                arr_sum += arr
                funding_sum += funding

            await conn.executemany(
                "UPDATE startup SET arr = $1, founder = $2, funding_size = $3 WHERE id = $4",
                batch,
            )

            offset += BATCH_SIZE
            total += len(batch)
            save_cursor(offset)
            print(f"  Updated {total}/{total_count} rows...")

        # Statistics
        print("\n=== Statistics ===")
        print(f"Total updated: {total}")
        if total > 0:
            print(f"Average ARR: ${arr_sum / total:,.0f}")
            print(f"Average funding: ${funding_sum / total:,.0f}")

        clear_cursor()

    finally:
        await conn.close()


if __name__ == "__main__":
    asyncio.run(main())
