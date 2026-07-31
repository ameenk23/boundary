"""HTTP routes for RoadSegment resources."""

from app.crud import (
    create_road_segment,
    delete_road_segment,
    get_road_segment,
    get_road_segments,
    update_road_segment,
)

from app.routers.entity_router import create_entity_router
from app.schemas import RoadSegmentCreate, RoadSegmentRead, RoadSegmentUpdate
from fastapi import Depends
from sqlalchemy.orm import Session

from app.database import get_db

router = create_entity_router("/road-segments", "road_segments", "Road segment", RoadSegmentCreate, RoadSegmentRead, RoadSegmentUpdate, create_road_segment, get_road_segment, get_road_segments, update_road_segment, delete_road_segment)

@router.get("/odd/{odd_id}", response_model=list[RoadSegmentRead])
def list_road_segments_by_odd(
    odd_id: int,
    db: Session = Depends(get_db),
):
    return get_road_segments(
        db,
        odd_id=odd_id,
    )