"""startup_investors

Revision ID: 54636db7d23a
Revises: d46058b1a771
Create Date: 2026-01-28 09:00:00.000000

"""

from typing import Sequence, Union

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "54636db7d23a"
down_revision: Union[str, Sequence[str], None] = "d46058b1a771"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    with open("./src/api/migrations/sql/0002_startup_investors.sql", "r") as file:
        sql_commands = file.read()

    op.execute(sql_commands)


def downgrade() -> None:
    """Downgrade schema."""
    op.execute("DROP TABLE startup_investor;")
