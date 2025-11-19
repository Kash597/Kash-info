"""
Member model - Core user/member entity
"""

from sqlalchemy import Column, String, Integer, Boolean, DateTime, Text, Enum
from sqlalchemy.sql import func
from datetime import datetime
import enum

from app.core.database import Base


class MemberRole(str, enum.Enum):
    """Member role types"""
    ADMIN = "admin"
    BOARD_MEMBER = "board_member"
    FOUNDING_MEMBER = "founding_member"
    REGULAR_MEMBER = "regular_member"
    APPLICANT = "applicant"


class MemberStatus(str, enum.Enum):
    """Member status types"""
    ACTIVE = "active"
    PENDING = "pending"
    SUSPENDED = "suspended"
    EXPIRED = "expired"


class Member(Base):
    """
    Member model representing platform users

    Attributes:
        id: Unique identifier
        email: Email address (unique)
        full_name: Full name
        role: Member role
        status: Current status
        industry_sector: Industry sector (1-12)
        membership_tier: Tier (founding/regular)
        annual_fee: Annual membership fee
        joined_at: Registration date
        expires_at: Membership expiration date
        profile_data: JSON profile information
        is_active: Active status
        created_at: Record creation timestamp
        updated_at: Record update timestamp
    """

    __tablename__ = "members"

    # Primary Key
    id = Column(Integer, primary_key=True, index=True)

    # Authentication & Identity
    email = Column(String(255), unique=True, nullable=False, index=True)
    full_name = Column(String(255), nullable=False)

    # Role & Status
    role = Column(Enum(MemberRole), default=MemberRole.APPLICANT, nullable=False)
    status = Column(Enum(MemberStatus), default=MemberStatus.PENDING, nullable=False)

    # Membership Details
    industry_sector = Column(Integer, nullable=True)  # 1-12
    membership_tier = Column(String(50), nullable=True)  # "founding" or "regular"
    annual_fee = Column(Integer, nullable=True)  # 397 or 497

    # Dates
    joined_at = Column(DateTime(timezone=True), nullable=True)
    expires_at = Column(DateTime(timezone=True), nullable=True)

    # Profile
    profile_data = Column(Text, nullable=True)  # JSON stored as text

    # Flags
    is_active = Column(Boolean, default=True, nullable=False)

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    def __repr__(self):
        return f"<Member(id={self.id}, email='{self.email}', role='{self.role}')>"
