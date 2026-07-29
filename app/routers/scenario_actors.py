"""HTTP routes for ScenarioActor resources."""

from app.crud import create_scenario_actor, delete_scenario_actor, get_scenario_actor, get_scenario_actors, update_scenario_actor
from app.routers.entity_router import create_entity_router
from app.schemas import ScenarioActorCreate, ScenarioActorRead, ScenarioActorUpdate

router = create_entity_router("/scenario-actors", "scenario_actors", "Scenario actor", ScenarioActorCreate, ScenarioActorRead, ScenarioActorUpdate, create_scenario_actor, get_scenario_actor, get_scenario_actors, update_scenario_actor, delete_scenario_actor)
