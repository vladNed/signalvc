"""vc_table

Revision ID: d46058b1a771
Revises: baba76b65da4
Create Date: 2026-01-28 08:53:31.904113

"""

from typing import Sequence, Union

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "d46058b1a771"
down_revision: Union[str, Sequence[str], None] = "baba76b65da4"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    with open("./src/api/migrations/sql/0001_vc_table.sql", "r") as file:
        sql_commands = file.read()

    op.execute(sql_commands)


def downgrade() -> None:
    """Downgrade schema."""
    op.execute("DROP TABLE investor;")
