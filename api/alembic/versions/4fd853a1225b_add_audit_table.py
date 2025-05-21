"""Add audit table

Revision ID: 4fd853a1225b
Revises: 4a894fa873ed
Create Date: 2025-05-20 22:22:04.180251
"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
from enums.http_method_enum import HttpMethodEnum
# Identifiants de migration
revision = '4fd853a1225b'
down_revision = '4a894fa873ed'
branch_labels = None
depends_on = None

http_method_enum = postgresql.ENUM('CREATE', 'POST', 'PATCH', 'DELETE', 'GET', 'PUT', 'UPDATE', name='http_method_enum')


def upgrade():
    # Créer le type ENUM dans PostgreSQL
    http_method_enum.create(op.get_bind(), checkfirst=True)

    op.create_table(
        'audits',
        sa.Column('audit_id', sa.Integer(), primary_key=True),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('path', sa.String(), nullable=False),
        sa.Column('method', sa.Enum(HttpMethodEnum, name='http_method_enum'), nullable=False, server_default='GET'),
        sa.Column('timestamp', sa.String(), nullable=False),
        sa.Column('details', sa.String(), nullable=True),
    )

def downgrade():
    op.drop_table('audits')
    http_method_enum.drop(op.get_bind(), checkfirst=True)

