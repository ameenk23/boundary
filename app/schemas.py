"""Pydantic schemas for ODD application data transfer objects."""

from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.models import ActorType, AutomationLevel, Direction, OddStatus, RoadType, SurfaceType


class ProjectBase(BaseModel):
    """Fields shared by Project create and read schemas."""

    name: str
    description: str | None = None


class ProjectCreate(ProjectBase):
    """Payload for creating a project."""


class ProjectUpdate(BaseModel):
    """Payload for partially updating a project."""

    name: str | None = None
    description: str | None = None


class ProjectRead(ProjectBase):
    """Project representation returned by the application."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    uuid: str
    created_at: datetime
    updated_at: datetime


class VehiclePlatformBase(BaseModel):
    project_id: int
    name: str
    description: str | None = None
    automation_level: AutomationLevel


class VehiclePlatformCreate(VehiclePlatformBase):
    pass


class VehiclePlatformUpdate(BaseModel):
    project_id: int | None = None
    name: str | None = None
    description: str | None = None
    automation_level: AutomationLevel | None = None


class VehiclePlatformRead(VehiclePlatformBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    uuid: str
    created_at: datetime
    updated_at: datetime


class ODDBase(BaseModel):
    vehicle_platform_id: int
    name: str
    description: str | None = None
    status: OddStatus


class ODDCreate(ODDBase):
    pass


class ODDUpdate(BaseModel):
    vehicle_platform_id: int | None = None
    name: str | None = None
    description: str | None = None
    status: OddStatus | None = None


class ODDRead(ODDBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    uuid: str
    created_at: datetime
    updated_at: datetime


class DrivableAreaBase(BaseModel):
    odd_id: int
    name: str
    description: str | None = None
    geometry: str


class DrivableAreaCreate(DrivableAreaBase):
    pass


class DrivableAreaUpdate(BaseModel):
    odd_id: int | None = None
    name: str | None = None
    description: str | None = None
    geometry: str | None = None


class DrivableAreaRead(DrivableAreaBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    uuid: str
    created_at: datetime
    updated_at: datetime


class LocationPinBase(BaseModel):
    odd_id: int
    name: str
    description: str | None = None
    geometry: str


class LocationPinCreate(LocationPinBase):
    pass


class LocationPinUpdate(BaseModel):
    odd_id: int | None = None
    name: str | None = None
    description: str | None = None
    geometry: str | None = None


class LocationPinRead(LocationPinBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    uuid: str
    created_at: datetime
    updated_at: datetime


class ZoneBase(BaseModel):
    drivable_area_id: int
    name: str
    description: str | None = None
    geometry: str


class ZoneCreate(ZoneBase):
    pass


class ZoneUpdate(BaseModel):
    drivable_area_id: int | None = None
    name: str | None = None
    description: str | None = None
    geometry: str | None = None


class ZoneRead(ZoneBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    uuid: str
    created_at: datetime
    updated_at: datetime


class RoadSegmentBase(BaseModel):
    odd_id: int
    zone_id: int | None = None
    name: str
    description: str | None = None
    geometry: str
    road_type: RoadType
    surface_type: SurfaceType
    direction: Direction
    speed_limit_kph: int | None = None


class RoadSegmentCreate(RoadSegmentBase):
    pass


class RoadSegmentUpdate(BaseModel):
    odd_id: int | None = None
    zone_id: int | None = None
    name: str | None = None
    description: str | None = None
    geometry: str | None = None
    road_type: RoadType | None = None
    surface_type: SurfaceType | None = None
    direction: Direction | None = None
    speed_limit_kph: int | None = None


class RoadSegmentRead(RoadSegmentBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    uuid: str
    created_at: datetime
    updated_at: datetime


class FunctionalScenarioBase(BaseModel):
    odd_id: int
    road_segment_id: int
    name: str
    description: str | None = None


class FunctionalScenarioCreate(FunctionalScenarioBase):
    pass


class FunctionalScenarioUpdate(BaseModel):
    odd_id: int | None = None
    road_segment_id: int | None = None
    name: str | None = None
    description: str | None = None


class FunctionalScenarioRead(FunctionalScenarioBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    uuid: str
    created_at: datetime
    updated_at: datetime


class ActorBase(BaseModel):
    name: str
    description: str | None = None
    actor_type: ActorType


class ActorCreate(ActorBase):
    pass


class ActorUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    actor_type: ActorType | None = None


class ActorRead(ActorBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    uuid: str
    created_at: datetime
    updated_at: datetime


class ScenarioActorBase(BaseModel):
    functional_scenario_id: int
    actor_id: int
    instance_name: str
    description: str | None = None
    role: str


class ScenarioActorCreate(ScenarioActorBase):
    pass


class ScenarioActorUpdate(BaseModel):
    functional_scenario_id: int | None = None
    actor_id: int | None = None
    instance_name: str | None = None
    description: str | None = None
    role: str | None = None


class ScenarioActorRead(ScenarioActorBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    uuid: str
    created_at: datetime
    updated_at: datetime
