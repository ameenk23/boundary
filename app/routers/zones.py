"""HTTP routes for Zone resources."""

from app.crud import create_zone, delete_zone, get_zone, get_zones, update_zone
from app.routers.entity_router import create_entity_router
from app.schemas import ZoneCreate, ZoneRead, ZoneUpdate

router = create_entity_router("/zones", "zones", "Zone", ZoneCreate, ZoneRead, ZoneUpdate, create_zone, get_zone, get_zones, update_zone, delete_zone)
