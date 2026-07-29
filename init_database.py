"""Create and seed the local Operational Design Domain SQLite database."""

from __future__ import annotations

import argparse

from sqlalchemy.orm import Session

from app.database import Base, DATABASE_PATH, engine
from app.models import (
    Actor,
    ActorType,
    AutomationLevel,
    Direction,
    DrivableArea,
    FunctionalScenario,
    ODD,
    OddStatus,
    Project,
    RoadSegment,
    RoadType,
    ScenarioActor,
    SurfaceType,
    VehiclePlatform,
    Zone,
)


def create_database() -> bool:
    """Create and report whether a new local database was initialized."""

    if DATABASE_PATH.exists():
        print(f"Database already exists: {DATABASE_PATH.name}")
        return False
    print("Creating database tables...")
    Base.metadata.create_all(engine)
    print("Database tables created.")
    return True


def reset_database() -> None:
    """Delete and recreate the local demo database when explicitly requested."""

    if DATABASE_PATH.exists():
        print(f"Removing existing database: {DATABASE_PATH.name}")
        engine.dispose()
        DATABASE_PATH.unlink()
    create_database()
    seed_database()


def seed_database() -> None:
    """Populate the database with a compact, realistic ODD example."""

    print("Seeding demo data...")
    with Session(engine) as session:
        project = Project(name="Berlin Urban Autonomy", description="Level 4 autonomous driving validation in Berlin.", created_by="demo")
        platform = VehiclePlatform(project=project, name="Atlas EV", description="Electric autonomous test vehicle.", automation_level=AutomationLevel.LEVEL_4, created_by="demo")
        odd = ODD(vehicle_platform=platform, name="Charlottenburg Daytime ODD", description="Urban driving in clear daytime conditions.", status=OddStatus.ACTIVE, created_by="demo")
        area = DrivableArea(odd=odd, name="Charlottenburg Test Area", description="Bounded public-road test area.", geometry='{"type":"Polygon","coordinates":[[[13.300,52.510],[13.315,52.510],[13.315,52.520],[13.300,52.520],[13.300,52.510]]]}', created_by="demo")
        session.add_all([project, platform, odd, area])
        session.flush()

        residential = Zone(drivable_area=area, name="Residential Zone", description="Low-speed residential streets.", geometry='{"type":"Polygon","coordinates":[[[13.300,52.510],[13.307,52.510],[13.307,52.520],[13.300,52.520],[13.300,52.510]]]}', created_by="demo")
        commercial = Zone(drivable_area=area, name="Commercial Zone", description="Busy retail and transit corridor.", geometry='{"type":"Polygon","coordinates":[[[13.307,52.510],[13.315,52.510],[13.315,52.520],[13.307,52.520],[13.307,52.510]]]}', created_by="demo")
        session.add_all([residential, commercial])
        session.flush()

        roads = [
            RoadSegment(odd=odd, zone=residential, name="Kantstrasse West", description="Residential arterial segment.", geometry='{"type":"LineString","coordinates":[[13.301,52.513],[13.306,52.513]]}', road_type=RoadType.URBAN_STREET, surface_type=SurfaceType.ASPHALT, direction=Direction.TWO_WAY, speed_limit_kph=30, created_by="demo"),
            RoadSegment(odd=odd, zone=residential, name="Wilmersdorfer Strasse", description="Local street with crossings.", geometry='{"type":"LineString","coordinates":[[13.304,52.511],[13.304,52.518]]}', road_type=RoadType.URBAN_STREET, surface_type=SurfaceType.ASPHALT, direction=Direction.TWO_WAY, speed_limit_kph=30, created_by="demo"),
            RoadSegment(odd=odd, zone=commercial, name="Kantstrasse East", description="Commercial arterial segment.", geometry='{"type":"LineString","coordinates":[[13.308,52.513],[13.314,52.513]]}', road_type=RoadType.URBAN_STREET, surface_type=SurfaceType.ASPHALT, direction=Direction.TWO_WAY, speed_limit_kph=50, created_by="demo"),
            RoadSegment(odd=odd, zone=commercial, name="Bus Lane Connector", description="One-way transit connector.", geometry='{"type":"LineString","coordinates":[[13.310,52.514],[13.313,52.517]]}', road_type=RoadType.URBAN_STREET, surface_type=SurfaceType.ASPHALT, direction=Direction.ONE_WAY, speed_limit_kph=30, created_by="demo"),
        ]
        scenarios = [
            FunctionalScenario(odd=odd, road_segment=roads[0], name="Unprotected Pedestrian Crossing", description="Ego vehicle yields to a pedestrian at an unprotected crossing.", created_by="demo"),
            FunctionalScenario(odd=odd, road_segment=roads[1], name="Cyclist Overtake", description="Ego vehicle safely overtakes a cyclist on an urban street.", created_by="demo"),
        ]
        actors = [
            Actor(name="Ego Vehicle", description="Automated Atlas EV under test.", actor_type=ActorType.EGO_VEHICLE, created_by="demo"),
            Actor(name="Pedestrian", description="Pedestrian entering a marked crossing.", actor_type=ActorType.PEDESTRIAN, created_by="demo"),
            Actor(name="Cyclist", description="Cyclist travelling in the vehicle lane.", actor_type=ActorType.CYCLIST, created_by="demo"),
        ]
        session.add_all(roads + scenarios + actors)
        session.flush()
        session.add_all([
            ScenarioActor(functional_scenario=scenarios[0], actor=actors[0], instance_name="Ego vehicle", role="ego", created_by="demo"),
            ScenarioActor(functional_scenario=scenarios[0], actor=actors[1], instance_name="Crossing pedestrian", role="dynamic_obstacle", created_by="demo"),
            ScenarioActor(functional_scenario=scenarios[1], actor=actors[0], instance_name="Ego vehicle", role="ego", created_by="demo"),
            ScenarioActor(functional_scenario=scenarios[1], actor=actors[2], instance_name="Lead cyclist", role="dynamic_obstacle", created_by="demo"),
        ])
        session.commit()
    print("Demo data seeded successfully.")


def main() -> None:
    """Initialize a database, or explicitly reset and reseed it."""

    parser = argparse.ArgumentParser(description="Initialize the ODD SQLite database.")
    parser.add_argument("--reset", action="store_true", help="Delete odd.db, recreate it, and load demo data.")
    args = parser.parse_args()

    print("Initializing ODD database...")
    if args.reset:
        reset_database()
    elif create_database():
        seed_database()
    print(f"ODD database ready: {DATABASE_PATH}")


if __name__ == "__main__":
    main()
