"""HTTP routes for ODD resources."""

from app.crud import create_odd, delete_odd, get_odd, get_odds, update_odd
from app.routers.entity_router import create_entity_router
from app.schemas import ODDCreate, ODDRead, ODDUpdate

router = create_entity_router("/odds", "odds", "ODD", ODDCreate, ODDRead, ODDUpdate, create_odd, get_odd, get_odds, update_odd, delete_odd)
