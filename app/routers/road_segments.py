"""HTTP routes for RoadSegment resources."""

from app.crud import create_road_segment, delete_road_segment, get_road_segment, get_road_segments, update_road_segment
from app.routers.entity_router import create_entity_router
from app.schemas import RoadSegmentCreate, RoadSegmentRead, RoadSegmentUpdate

router = create_entity_router("/road-segments", "road_segments", "Road segment", RoadSegmentCreate, RoadSegmentRead, RoadSegmentUpdate, create_road_segment, get_road_segment, get_road_segments, update_road_segment, delete_road_segment)
