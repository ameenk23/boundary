"""HTTP routes for Zone resources."""

from fastapi import Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.crud import (
    create_zone,
    delete_zone,
    get_zone,
    get_zones,
    update_zone,
)
from app.routers.entity_router import create_entity_router
from app.schemas import ZoneCreate, ZoneRead, ZoneUpdate

router = create_entity_router(
    "/zones",
    "zones",
    "Zone",
    ZoneCreate,
    ZoneRead,
    ZoneUpdate,
    create_zone,
    get_zone,
    get_zones,
    update_zone,
    delete_zone,
)


@router.get("/odd/{odd_id}", response_model=list[ZoneRead])
def list_zones_by_odd(
    odd_id: int,
    db: Session = Depends(get_db),
):
    return get_zones(
        db,
        odd_id=odd_id,
    )