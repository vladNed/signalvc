"""initial

Revision ID: baba76b65da4
Revises:
Create Date: 2026-01-27 16:14:54.503565

"""

from alembic import op
from typing import Sequence, Union


# revision identifiers, used by Alembic.
revision: str = "baba76b65da4"
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    with open("migrations/sql/0000_initial.sql", "r") as file:
        sql_commands = file.read()

    op.execute(sql_commands)


def downgrade() -> None:
    """Downgrade schema."""
    op.execute(
        """
        DROP INDEX IF EXISTS idx_startup_target_markets;
        DROP INDEX IF EXISTS idx_startup_country;
        DROP INDEX IF EXISTS idx_startup_category;
        DROP TABLE IF EXISTS startup;
        DROP TABLE IF EXISTS profile;
        """
    )
