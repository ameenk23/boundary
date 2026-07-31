"""HTTP routes for VehiclePlatform resources."""

from fastapi import Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.crud import (
    create_vehicle_platform,
    delete_vehicle_platform,
    get_vehicle_platform,
    get_vehicle_platforms,
    update_vehicle_platform,
)
from app.routers.entity_router import create_entity_router
from app.schemas import (
    VehiclePlatformCreate,
    VehiclePlatformRead,
    VehiclePlatformUpdate,
)

router = create_entity_router(
    "/vehicle-platforms",
    "vehicle_platforms",
    "Vehicle platform",
    VehiclePlatformCreate,
    VehiclePlatformRead,
    VehiclePlatformUpdate,
    create_vehicle_platform,
    get_vehicle_platform,
    get_vehicle_platforms,
    update_vehicle_platform,
    delete_vehicle_platform,
)


@router.get("/project/{project_id}", response_model=list[VehiclePlatformRead])
def list_vehicle_platforms_by_project(
    project_id: int,
    db: Session = Depends(get_db),
):
    return get_vehicle_platforms(
        db,
        project_id=project_id,
    )