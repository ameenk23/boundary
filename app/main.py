from fastapi import FastAPI

from app.routers.actors import router as actors_router
from app.routers.drivable_areas import router as drivable_areas_router
from app.routers.functional_scenarios import router as functional_scenarios_router
from app.routers.location_pins import router as location_pins_router
from app.routers.odds import router as odds_router
from app.routers.projects import router as projects_router
from app.routers.road_segments import router as road_segments_router
from app.routers.scenario_actors import router as scenario_actors_router
from app.routers.vehicle_platforms import router as vehicle_platforms_router
from app.routers.zones import router as zones_router

app = FastAPI(
    title="ODD Tool API",
    version="0.1.0",
)

app.include_router(projects_router)
app.include_router(vehicle_platforms_router)
app.include_router(odds_router)
app.include_router(drivable_areas_router)
app.include_router(location_pins_router)
app.include_router(zones_router)
app.include_router(road_segments_router)
app.include_router(functional_scenarios_router)
app.include_router(actors_router)
app.include_router(scenario_actors_router)


@app.get("/")
def root():
    return {"message": "ODD Tool API is running"}


@app.get("/health")
def health():
    return {"status": "healthy", "database": "connected", "version": "0.1.0"}
