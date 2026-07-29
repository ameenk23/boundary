"""HTTP routes for LocationPin resources."""

from app.crud import create_location_pin, delete_location_pin, get_location_pin, get_location_pins, update_location_pin
from app.routers.entity_router import create_entity_router
from app.schemas import LocationPinCreate, LocationPinRead, LocationPinUpdate

router = create_entity_router("/location-pins", "location_pins", "Location pin", LocationPinCreate, LocationPinRead, LocationPinUpdate, create_location_pin, get_location_pin, get_location_pins, update_location_pin, delete_location_pin)
