"""SQLAlchemy models and domain enums for the ODD application."""

from __future__ import annotations

from enum import Enum
from typing import Optional

from sqlalchemy import CheckConstraint, Enum as SqlEnum, ForeignKey, Index, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base, BaseEntity


class OddStatus(str, Enum):
    """Lifecycle states for an operational design domain."""

    DRAFT = "draft"
    ACTIVE = "active"
    ARCHIVED = "archived"


class RoadType(str, Enum):
    MOTORWAY = "motorway"
    URBAN_STREET = "urban_street"
    RURAL_ROAD = "rural_road"
    PARKING_AREA = "parking_area"


class SurfaceType(str, Enum):
    ASPHALT = "asphalt"
    CONCRETE = "concrete"
    GRAVEL = "gravel"
    MIXED = "mixed"


class Direction(str, Enum):
    ONE_WAY = "one_way"
    TWO_WAY = "two_way"


class ActorType(str, Enum):
    EGO_VEHICLE = "ego_vehicle"
    VEHICLE = "vehicle"
    PEDESTRIAN = "pedestrian"
    CYCLIST = "cyclist"
    INFRASTRUCTURE = "infrastructure"


class AutomationLevel(str, Enum):
    LEVEL_0 = "level_0"
    LEVEL_1 = "level_1"
    LEVEL_2 = "level_2"
    LEVEL_3 = "level_3"
    LEVEL_4 = "level_4"
    LEVEL_5 = "level_5"


def enum_values(enum_class: type[Enum]) -> list[str]:
    """Store enum values (for example, ``active``), not member names."""

    return [member.value for member in enum_class]


class Project(BaseEntity):
    __tablename__ = "projects"

    name: Mapped[str] = mapped_column(String(200), unique=True, nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    vehicle_platforms: Mapped[list[VehiclePlatform]] = relationship(back_populates="project")


class VehiclePlatform(BaseEntity):
    __tablename__ = "vehicle_platforms"

    project_id: Mapped[int] = mapped_column(ForeignKey("projects.id", ondelete="RESTRICT"), index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    automation_level: Mapped[AutomationLevel] = mapped_column(
        SqlEnum(AutomationLevel, native_enum=False, create_constraint=True, values_callable=enum_values), nullable=False
    )

    project: Mapped[Project] = relationship(back_populates="vehicle_platforms")
    odds: Mapped[list[ODD]] = relationship(back_populates="vehicle_platform")


class ODD(BaseEntity):
    __tablename__ = "odds"
    __table_args__ = (Index("ix_odds_vehicle_platform_id_is_deleted", "vehicle_platform_id", "is_deleted"),)

    vehicle_platform_id: Mapped[int] = mapped_column(
        ForeignKey("vehicle_platforms.id", ondelete="RESTRICT"), index=True, nullable=False
    )
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    status: Mapped[OddStatus] = mapped_column(
        SqlEnum(OddStatus, native_enum=False, create_constraint=True, values_callable=enum_values),
        default=OddStatus.DRAFT,
        nullable=False,
    )

    vehicle_platform: Mapped[VehiclePlatform] = relationship(back_populates="odds")
    drivable_areas: Mapped[list[DrivableArea]] = relationship(back_populates="odd")
    location_pins: Mapped[list[LocationPin]] = relationship(back_populates="odd")
    road_segments: Mapped[list[RoadSegment]] = relationship(back_populates="odd")
    functional_scenarios: Mapped[list[FunctionalScenario]] = relationship(back_populates="odd")


class DrivableArea(BaseEntity):
    __tablename__ = "drivable_areas"
    __table_args__ = (Index("ix_drivable_areas_odd_id_is_deleted", "odd_id", "is_deleted"),)

    odd_id: Mapped[int] = mapped_column(ForeignKey("odds.id", ondelete="RESTRICT"), index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    geometry: Mapped[str] = mapped_column(Text, nullable=False)  # GeoJSON; validated by the application layer.

    odd: Mapped[ODD] = relationship(back_populates="drivable_areas")
    zones: Mapped[list[Zone]] = relationship(back_populates="drivable_area")


class LocationPin(BaseEntity):
    __tablename__ = "location_pins"

    odd_id: Mapped[int] = mapped_column(ForeignKey("odds.id", ondelete="RESTRICT"), index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    geometry: Mapped[str] = mapped_column(Text, nullable=False)  # GeoJSON Point

    odd: Mapped[ODD] = relationship(back_populates="location_pins")


class Zone(BaseEntity):
    __tablename__ = "zones"
    __table_args__ = (Index("ix_zones_drivable_area_id_is_deleted", "drivable_area_id", "is_deleted"),)

    drivable_area_id: Mapped[int] = mapped_column(
        ForeignKey("drivable_areas.id", ondelete="RESTRICT"), index=True, nullable=False
    )
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    geometry: Mapped[str] = mapped_column(Text, nullable=False)  # GeoJSON

    drivable_area: Mapped[DrivableArea] = relationship(back_populates="zones")
    road_segments: Mapped[list[RoadSegment]] = relationship(back_populates="zone")


class RoadSegment(BaseEntity):
    __tablename__ = "road_segments"
    __table_args__ = (
        CheckConstraint("speed_limit_kph IS NULL OR speed_limit_kph >= 0", name="ck_road_segments_non_negative_speed_limit"),
        Index("ix_road_segments_zone_id_is_deleted", "zone_id", "is_deleted"),
    )

    odd_id: Mapped[int] = mapped_column(ForeignKey("odds.id", ondelete="RESTRICT"), index=True, nullable=False)
    zone_id: Mapped[Optional[int]] = mapped_column(ForeignKey("zones.id", ondelete="RESTRICT"), index=True, nullable=True)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    geometry: Mapped[str] = mapped_column(Text, nullable=False)  # GeoJSON LineString
    road_type: Mapped[RoadType] = mapped_column(
        SqlEnum(RoadType, native_enum=False, create_constraint=True, values_callable=enum_values), nullable=False
    )
    surface_type: Mapped[SurfaceType] = mapped_column(
        SqlEnum(SurfaceType, native_enum=False, create_constraint=True, values_callable=enum_values), nullable=False
    )
    direction: Mapped[Direction] = mapped_column(
        SqlEnum(Direction, native_enum=False, create_constraint=True, values_callable=enum_values), nullable=False
    )
    speed_limit_kph: Mapped[Optional[int]] = mapped_column(nullable=True)

    odd: Mapped[ODD] = relationship(back_populates="road_segments")
    zone: Mapped[Optional[Zone]] = relationship(back_populates="road_segments")
    functional_scenarios: Mapped[list[FunctionalScenario]] = relationship(back_populates="road_segment")


class FunctionalScenario(BaseEntity):
    __tablename__ = "functional_scenarios"
    __table_args__ = (Index("ix_functional_scenarios_road_segment_id_is_deleted", "road_segment_id", "is_deleted"),)

    odd_id: Mapped[int] = mapped_column(ForeignKey("odds.id", ondelete="RESTRICT"), index=True, nullable=False)
    road_segment_id: Mapped[int] = mapped_column(
        ForeignKey("road_segments.id", ondelete="RESTRICT"), index=True, nullable=False
    )
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    odd: Mapped[ODD] = relationship(back_populates="functional_scenarios")
    road_segment: Mapped[RoadSegment] = relationship(back_populates="functional_scenarios")
    scenario_actors: Mapped[list[ScenarioActor]] = relationship(back_populates="functional_scenario")


class Actor(BaseEntity):
    __tablename__ = "actors"

    name: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    actor_type: Mapped[ActorType] = mapped_column(
        SqlEnum(ActorType, native_enum=False, create_constraint=True, values_callable=enum_values), nullable=False
    )

    scenario_actors: Mapped[list[ScenarioActor]] = relationship(back_populates="actor")


class ScenarioActor(BaseEntity):
    __tablename__ = "scenario_actors"
    __table_args__ = (Index("ix_scenario_actors_functional_scenario_id_actor_id", "functional_scenario_id", "actor_id"),)

    functional_scenario_id: Mapped[int] = mapped_column(
        ForeignKey("functional_scenarios.id", ondelete="RESTRICT"), index=True, nullable=False
    )
    actor_id: Mapped[int] = mapped_column(ForeignKey("actors.id", ondelete="RESTRICT"), index=True, nullable=False)
    instance_name: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    role: Mapped[str] = mapped_column(String(100), nullable=False)

    functional_scenario: Mapped[FunctionalScenario] = relationship(back_populates="scenario_actors")
    actor: Mapped[Actor] = relationship(back_populates="scenario_actors")
