"""startup_financials

Revision ID: b3f1a2c7d8e9
Revises: aa0e3d63e4e2
Create Date: 2026-02-26 12:00:00.000000

"""

from typing import Sequence, Union

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "b3f1a2c7d8e9"
down_revision: Union[str, Sequence[str], None] = "aa0e3d63e4e2"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    with open("./src/api/migrations/sql/0005_startup_financials.sql", "r") as file:
        sql_commands = file.read()

    op.execute(sql_commands)


def downgrade() -> None:
    """Downgrade schema."""
    op.execute("ALTER TABLE startup DROP COLUMN IF EXISTS arr;")
    op.execute("ALTER TABLE startup DROP COLUMN IF EXISTS founder;")
    op.execute("ALTER TABLE startup DROP COLUMN IF EXISTS funding_size;")
