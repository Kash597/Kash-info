"""Initial schema - members table

Revision ID: 0001_initial
Revises:
Create Date: 2025-10-26

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0001_initial'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    """Create initial members table"""

    # Create member_role enum
    member_role_enum = sa.Enum(
        'admin',
        'board_member',
        'founding_member',
        'regular_member',
        'applicant',
        name='memberrole'
    )

    # Create member_status enum
    member_status_enum = sa.Enum(
        'active',
        'pending',
        'suspended',
        'expired',
        name='memberstatus'
    )

    # Create members table
    op.create_table(
        'members',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('full_name', sa.String(length=255), nullable=False),
        sa.Column('role', member_role_enum, nullable=False, server_default='applicant'),
        sa.Column('status', member_status_enum, nullable=False, server_default='pending'),
        sa.Column('industry_sector', sa.Integer(), nullable=True),
        sa.Column('membership_tier', sa.String(length=50), nullable=True),
        sa.Column('annual_fee', sa.Integer(), nullable=True),
        sa.Column('joined_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('expires_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('profile_data', sa.Text(), nullable=True),
        sa.Column('is_active', sa.Boolean(), nullable=False, server_default='true'),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )

    # Create indexes
    op.create_index('ix_members_id', 'members', ['id'], unique=False)
    op.create_index('ix_members_email', 'members', ['email'], unique=True)


def downgrade() -> None:
    """Drop members table and enums"""
    op.drop_index('ix_members_email', table_name='members')
    op.drop_index('ix_members_id', table_name='members')
    op.drop_table('members')

    # Drop enums
    sa.Enum(name='memberrole').drop(op.get_bind(), checkfirst=True)
    sa.Enum(name='memberstatus').drop(op.get_bind(), checkfirst=True)
