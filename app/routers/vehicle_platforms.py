"""HTTP routes for VehiclePlatform resources."""

from app.crud import create_vehicle_platform, delete_vehicle_platform, get_vehicle_platform, get_vehicle_platforms, update_vehicle_platform
from app.routers.entity_router import create_entity_router
from app.schemas import VehiclePlatformCreate, VehiclePlatformRead, VehiclePlatformUpdate

router = create_entity_router("/vehicle-platforms", "vehicle_platforms", "Vehicle platform", VehiclePlatformCreate, VehiclePlatformRead, VehiclePlatformUpdate, create_vehicle_platform, get_vehicle_platform, get_vehicle_platforms, update_vehicle_platform, delete_vehicle_platform)
