"""swipes table

Revision ID: aa0e3d63e4e2
Revises: 54636db7d23a
Create Date: 2026-01-28 18:56:45.860320

"""

from typing import Sequence, Union

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "aa0e3d63e4e2"
down_revision: Union[str, Sequence[str], None] = "54636db7d23a"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    with open("migrations/sql/0003_swipes_table.sql", "r") as file:
        sql_commands = file.read()

    op.execute(sql_commands)


def downgrade() -> None:
    """Downgrade schema."""
    op.execute("DROP TABLE IF EXISTS swipes;")
    op.execute("DROP TYPE IF EXISTS swipe_type;")
    op.execute("DROP TABLE IF EXISTS swipe_stats;")
