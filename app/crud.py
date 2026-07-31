"""Database operations for ODD application entities."""

from __future__ import annotations

from datetime import datetime, timezone
from typing import TypeVar
from typing import Optional

from sqlalchemy import select
from sqlalchemy.orm import Session


from app.models import (
    Actor,
    DrivableArea,
    FunctionalScenario,
    LocationPin,
    ODD,
    Project,
    RoadSegment,
    ScenarioActor,
    VehiclePlatform,
    Zone,
)
from app.schemas import (
    ActorCreate,
    ActorUpdate,
    DrivableAreaCreate,
    DrivableAreaUpdate,
    FunctionalScenarioCreate,
    FunctionalScenarioUpdate,
    LocationPinCreate,
    LocationPinUpdate,
    ODDCreate,
    ODDUpdate,
    ProjectCreate,
    ProjectUpdate,
    RoadSegmentCreate,
    RoadSegmentUpdate,
    ScenarioActorCreate,
    ScenarioActorUpdate,
    VehiclePlatformCreate,
    VehiclePlatformUpdate,
    ZoneCreate,
    ZoneUpdate,
)


ModelType = TypeVar("ModelType")


def _create(db: Session, model_class: type[ModelType], schema: object, created_by: str | None = None) -> ModelType:
    model = model_class(**schema.model_dump(), created_by=created_by)
    db.add(model)
    db.commit()
    db.refresh(model)
    return model


def _get(db: Session, model_class: type[ModelType], entity_id: int) -> ModelType | None:
    statement = select(model_class).where(model_class.id == entity_id, model_class.is_deleted.is_(False))
    return db.scalar(statement)


def _get_all(db: Session, model_class: type[ModelType], offset: int = 0, limit: int = 100) -> list[ModelType]:
    statement = select(model_class).where(model_class.is_deleted.is_(False)).order_by(model_class.id).offset(offset).limit(limit)
    return list(db.scalars(statement))


def _update(db: Session, model: ModelType, schema: object, updated_by: str | None = None) -> ModelType:
    for field_name, value in schema.model_dump(exclude_unset=True).items():
        setattr(model, field_name, value)
    model.updated_by = updated_by
    db.commit()
    db.refresh(model)
    return model


def _soft_delete(db: Session, model: ModelType, deleted_by: str | None = None) -> ModelType:
    model.is_deleted = True
    model.deleted_at = datetime.now(timezone.utc)
    model.deleted_by = deleted_by
    model.updated_by = deleted_by
    db.commit()
    db.refresh(model)
    return model


def create_project(db: Session, project_in: ProjectCreate, created_by: str | None = None) -> Project:
    """Create and return a project."""

    project = Project(**project_in.model_dump(), created_by=created_by)
    db.add(project)
    db.commit()
    db.refresh(project)
    return project


def get_project(db: Session, project_id: int) -> Project | None:
    """Return one active project by its primary key."""

    statement = select(Project).where(Project.id == project_id, Project.is_deleted.is_(False))
    return db.scalar(statement)


def get_projects(db: Session, offset: int = 0, limit: int = 100) -> list[Project]:
    """Return a page of active projects."""

    statement = (
        select(Project)
        .where(Project.is_deleted.is_(False))
        .order_by(Project.id)
        .offset(offset)
        .limit(limit)
    )
    return list(db.scalars(statement))


def update_project(
    db: Session,
    project_id: int,
    project_in: ProjectUpdate,
    updated_by: str | None = None,
) -> Project | None:
    """Update and return an active project, or ``None`` when it is absent."""

    project = get_project(db, project_id)
    if project is None:
        return None

    for field_name, value in project_in.model_dump(exclude_unset=True).items():
        setattr(project, field_name, value)
    project.updated_by = updated_by
    db.commit()
    db.refresh(project)
    return project


def delete_project(db: Session, project_id: int, deleted_by: str | None = None) -> Project | None:
    """Soft-delete and return an active project, or ``None`` when it is absent."""

    project = get_project(db, project_id)
    if project is None:
        return None

    project.is_deleted = True
    project.deleted_at = datetime.now(timezone.utc)
    project.deleted_by = deleted_by
    project.updated_by = deleted_by
    db.commit()
    db.refresh(project)
    return project


def create_vehicle_platform(db: Session, vehicle_platform_in: VehiclePlatformCreate, created_by: str | None = None) -> VehiclePlatform:
    return _create(db, VehiclePlatform, vehicle_platform_in, created_by)


def get_vehicle_platform(db: Session, vehicle_platform_id: int) -> VehiclePlatform | None:
    return _get(db, VehiclePlatform, vehicle_platform_id)


def get_vehicle_platforms(
    db: Session,
    project_id: Optional[int] = None,
):
    query = db.query(VehiclePlatform)

    if project_id is not None:
        query = query.filter(
            VehiclePlatform.project_id == project_id
        )

    return query.all()

def update_vehicle_platform(db: Session, vehicle_platform_id: int, vehicle_platform_in: VehiclePlatformUpdate, updated_by: str | None = None) -> VehiclePlatform | None:
    vehicle_platform = get_vehicle_platform(db, vehicle_platform_id)
    return None if vehicle_platform is None else _update(db, vehicle_platform, vehicle_platform_in, updated_by)


def delete_vehicle_platform(db: Session, vehicle_platform_id: int, deleted_by: str | None = None) -> VehiclePlatform | None:
    vehicle_platform = get_vehicle_platform(db, vehicle_platform_id)
    return None if vehicle_platform is None else _soft_delete(db, vehicle_platform, deleted_by)


def create_odd(db: Session, odd_in: ODDCreate, created_by: str | None = None) -> ODD:
    return _create(db, ODD, odd_in, created_by)


def get_odd(db: Session, odd_id: int) -> ODD | None:
    return _get(db, ODD, odd_id)


def get_odds(
    db: Session,
    platform_id: Optional[int] = None,
    offset: int = 0,
    limit: int = 100,
) -> list[ODD]:

    query = db.query(ODD).filter(ODD.is_deleted.is_(False))

    if platform_id is not None:
        query = query.filter(ODD.vehicle_platform_id == platform_id)

    return (
        query
        .order_by(ODD.id)
        .offset(offset)
        .limit(limit)
        .all()
    )

def update_odd(db: Session, odd_id: int, odd_in: ODDUpdate, updated_by: str | None = None) -> ODD | None:
    odd = get_odd(db, odd_id)
    return None if odd is None else _update(db, odd, odd_in, updated_by)


def delete_odd(db: Session, odd_id: int, deleted_by: str | None = None) -> ODD | None:
    odd = get_odd(db, odd_id)
    return None if odd is None else _soft_delete(db, odd, deleted_by)


def create_drivable_area(db: Session, drivable_area_in: DrivableAreaCreate, created_by: str | None = None) -> DrivableArea:
    return _create(db, DrivableArea, drivable_area_in, created_by)


def get_drivable_area(db: Session, drivable_area_id: int) -> DrivableArea | None:
    return _get(db, DrivableArea, drivable_area_id)


def get_drivable_areas(db: Session, offset: int = 0, limit: int = 100) -> list[DrivableArea]:
    return _get_all(db, DrivableArea, offset, limit)


def update_drivable_area(db: Session, drivable_area_id: int, drivable_area_in: DrivableAreaUpdate, updated_by: str | None = None) -> DrivableArea | None:
    drivable_area = get_drivable_area(db, drivable_area_id)
    return None if drivable_area is None else _update(db, drivable_area, drivable_area_in, updated_by)


def delete_drivable_area(db: Session, drivable_area_id: int, deleted_by: str | None = None) -> DrivableArea | None:
    drivable_area = get_drivable_area(db, drivable_area_id)
    return None if drivable_area is None else _soft_delete(db, drivable_area, deleted_by)


def create_location_pin(db: Session, location_pin_in: LocationPinCreate, created_by: str | None = None) -> LocationPin:
    return _create(db, LocationPin, location_pin_in, created_by)


def get_location_pin(db: Session, location_pin_id: int) -> LocationPin | None:
    return _get(db, LocationPin, location_pin_id)


def get_location_pins(db: Session, offset: int = 0, limit: int = 100) -> list[LocationPin]:
    return _get_all(db, LocationPin, offset, limit)


def update_location_pin(db: Session, location_pin_id: int, location_pin_in: LocationPinUpdate, updated_by: str | None = None) -> LocationPin | None:
    location_pin = get_location_pin(db, location_pin_id)
    return None if location_pin is None else _update(db, location_pin, location_pin_in, updated_by)


def delete_location_pin(db: Session, location_pin_id: int, deleted_by: str | None = None) -> LocationPin | None:
    location_pin = get_location_pin(db, location_pin_id)
    return None if location_pin is None else _soft_delete(db, location_pin, deleted_by)


def create_zone(db: Session, zone_in: ZoneCreate, created_by: str | None = None) -> Zone:
    return _create(db, Zone, zone_in, created_by)


def get_zone(db: Session, zone_id: int) -> Zone | None:
    return _get(db, Zone, zone_id)


def get_zones(
    db: Session,
    odd_id: Optional[int] = None,
    offset: int = 0,
    limit: int = 100,
):
    query = (
        db.query(Zone)
        .join(DrivableArea)
        .filter(Zone.is_deleted.is_(False))
    )

    if odd_id is not None:
        query = query.filter(
            DrivableArea.odd_id == odd_id
        )

    return (
        query
        .order_by(Zone.id)
        .offset(offset)
        .limit(limit)
        .all()
    )


def update_zone(db: Session, zone_id: int, zone_in: ZoneUpdate, updated_by: str | None = None) -> Zone | None:
    zone = get_zone(db, zone_id)
    return None if zone is None else _update(db, zone, zone_in, updated_by)


def delete_zone(db: Session, zone_id: int, deleted_by: str | None = None) -> Zone | None:
    zone = get_zone(db, zone_id)
    return None if zone is None else _soft_delete(db, zone, deleted_by)


def create_road_segment(db: Session, road_segment_in: RoadSegmentCreate, created_by: str | None = None) -> RoadSegment:
    return _create(db, RoadSegment, road_segment_in, created_by)


def get_road_segment(db: Session, road_segment_id: int) -> RoadSegment | None:
    return _get(db, RoadSegment, road_segment_id)


def get_road_segments(
    db: Session,
    odd_id: Optional[int] = None,
    offset: int = 0,
    limit: int = 100,
) -> list[RoadSegment]:

    query = db.query(RoadSegment).filter(
        RoadSegment.is_deleted.is_(False)
    )

    if odd_id is not None:
        query = query.filter(
            RoadSegment.odd_id == odd_id
        )

    return (
        query
        .order_by(RoadSegment.id)
        .offset(offset)
        .limit(limit)
        .all()
    )


def update_road_segment(db: Session, road_segment_id: int, road_segment_in: RoadSegmentUpdate, updated_by: str | None = None) -> RoadSegment | None:
    road_segment = get_road_segment(db, road_segment_id)
    return None if road_segment is None else _update(db, road_segment, road_segment_in, updated_by)


def delete_road_segment(db: Session, road_segment_id: int, deleted_by: str | None = None) -> RoadSegment | None:
    road_segment = get_road_segment(db, road_segment_id)
    return None if road_segment is None else _soft_delete(db, road_segment, deleted_by)


def create_functional_scenario(db: Session, functional_scenario_in: FunctionalScenarioCreate, created_by: str | None = None) -> FunctionalScenario:
    return _create(db, FunctionalScenario, functional_scenario_in, created_by)


def get_functional_scenario(db: Session, functional_scenario_id: int) -> FunctionalScenario | None:
    return _get(db, FunctionalScenario, functional_scenario_id)


def get_functional_scenarios(db: Session, offset: int = 0, limit: int = 100) -> list[FunctionalScenario]:
    return _get_all(db, FunctionalScenario, offset, limit)


def update_functional_scenario(db: Session, functional_scenario_id: int, functional_scenario_in: FunctionalScenarioUpdate, updated_by: str | None = None) -> FunctionalScenario | None:
    functional_scenario = get_functional_scenario(db, functional_scenario_id)
    return None if functional_scenario is None else _update(db, functional_scenario, functional_scenario_in, updated_by)


def delete_functional_scenario(db: Session, functional_scenario_id: int, deleted_by: str | None = None) -> FunctionalScenario | None:
    functional_scenario = get_functional_scenario(db, functional_scenario_id)
    return None if functional_scenario is None else _soft_delete(db, functional_scenario, deleted_by)


def create_actor(db: Session, actor_in: ActorCreate, created_by: str | None = None) -> Actor:
    return _create(db, Actor, actor_in, created_by)


def get_actor(db: Session, actor_id: int) -> Actor | None:
    return _get(db, Actor, actor_id)


def get_actors(db: Session, offset: int = 0, limit: int = 100) -> list[Actor]:
    return _get_all(db, Actor, offset, limit)


def update_actor(db: Session, actor_id: int, actor_in: ActorUpdate, updated_by: str | None = None) -> Actor | None:
    actor = get_actor(db, actor_id)
    return None if actor is None else _update(db, actor, actor_in, updated_by)


def delete_actor(db: Session, actor_id: int, deleted_by: str | None = None) -> Actor | None:
    actor = get_actor(db, actor_id)
    return None if actor is None else _soft_delete(db, actor, deleted_by)


def create_scenario_actor(db: Session, scenario_actor_in: ScenarioActorCreate, created_by: str | None = None) -> ScenarioActor:
    return _create(db, ScenarioActor, scenario_actor_in, created_by)


def get_scenario_actor(db: Session, scenario_actor_id: int) -> ScenarioActor | None:
    return _get(db, ScenarioActor, scenario_actor_id)


def get_scenario_actors(db: Session, offset: int = 0, limit: int = 100) -> list[ScenarioActor]:
    return _get_all(db, ScenarioActor, offset, limit)


def update_scenario_actor(db: Session, scenario_actor_id: int, scenario_actor_in: ScenarioActorUpdate, updated_by: str | None = None) -> ScenarioActor | None:
    scenario_actor = get_scenario_actor(db, scenario_actor_id)
    return None if scenario_actor is None else _update(db, scenario_actor, scenario_actor_in, updated_by)


def delete_scenario_actor(db: Session, scenario_actor_id: int, deleted_by: str | None = None) -> ScenarioActor | None:
    scenario_actor = get_scenario_actor(db, scenario_actor_id)
    return None if scenario_actor is None else _soft_delete(db, scenario_actor, deleted_by)