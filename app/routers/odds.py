"""HTTP routes for ODD resources."""

from app.crud import create_odd, delete_odd, get_odd, get_odds, update_odd
from app.routers.entity_router import create_entity_router
from app.schemas import ODDCreate, ODDRead, ODDUpdate
from fastapi import Depends
from sqlalchemy.orm import Session

from app.database import get_db

router = create_entity_router("/odds", "odds", "ODD", ODDCreate, ODDRead, ODDUpdate, create_odd, get_odd, get_odds, update_odd, delete_odd)

@router.get("/platform/{platform_id}", response_model=list[ODDRead])
def list_odds_by_platform(
    platform_id: int,
    db: Session = Depends(get_db),
):
    return get_odds(
        db,
        platform_id=platform_id,
    )