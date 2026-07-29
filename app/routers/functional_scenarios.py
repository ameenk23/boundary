"""HTTP routes for FunctionalScenario resources."""

from app.crud import create_functional_scenario, delete_functional_scenario, get_functional_scenario, get_functional_scenarios, update_functional_scenario
from app.routers.entity_router import create_entity_router
from app.schemas import FunctionalScenarioCreate, FunctionalScenarioRead, FunctionalScenarioUpdate

router = create_entity_router("/functional-scenarios", "functional_scenarios", "Functional scenario", FunctionalScenarioCreate, FunctionalScenarioRead, FunctionalScenarioUpdate, create_functional_scenario, get_functional_scenario, get_functional_scenarios, update_functional_scenario, delete_functional_scenario)
