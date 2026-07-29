"""HTTP routes for DrivableArea resources."""

from app.crud import create_drivable_area, delete_drivable_area, get_drivable_area, get_drivable_areas, update_drivable_area
from app.routers.entity_router import create_entity_router
from app.schemas import DrivableAreaCreate, DrivableAreaRead, DrivableAreaUpdate

router = create_entity_router("/drivable-areas", "drivable_areas", "Drivable area", DrivableAreaCreate, DrivableAreaRead, DrivableAreaUpdate, create_drivable_area, get_drivable_area, get_drivable_areas, update_drivable_area, delete_drivable_area)
