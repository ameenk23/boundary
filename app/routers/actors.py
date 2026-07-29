"""HTTP routes for Actor resources."""

from app.crud import create_actor, delete_actor, get_actor, get_actors, update_actor
from app.routers.entity_router import create_entity_router
from app.schemas import ActorCreate, ActorRead, ActorUpdate

router = create_entity_router("/actors", "actors", "Actor", ActorCreate, ActorRead, ActorUpdate, create_actor, get_actor, get_actors, update_actor, delete_actor)
