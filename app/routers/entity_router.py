"""Factory for the standard CRUD routers used by ODD entities."""

from typing import Any, Callable

from fastapi import APIRouter, Depends, HTTPException, Response, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db


def create_entity_router(
    prefix: str,
    tag: str,
    entity_name: str,
    create_schema: type[BaseModel],
    read_schema: type[BaseModel],
    update_schema: type[BaseModel],
    create_entity: Callable[..., Any],
    get_entity: Callable[..., Any],
    get_entities: Callable[..., Any],
    update_entity: Callable[..., Any],
    delete_entity: Callable[..., Any],
) -> APIRouter:
    """Create a standard active-record CRUD router backed by CRUD functions."""

    router = APIRouter(prefix=prefix, tags=[tag])

    @router.get("", response_model=list[read_schema])
    def list_entities(db: Session = Depends(get_db)) -> list[Any]:
        return get_entities(db)

    @router.get("/{entity_id}", response_model=read_schema)
    def read_entity(entity_id: int, db: Session = Depends(get_db)) -> Any:
        entity = get_entity(db, entity_id)
        if entity is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"{entity_name} not found")
        return entity

    @router.post("", response_model=read_schema, status_code=status.HTTP_201_CREATED)
    def create_entity_route(entity_in: create_schema, db: Session = Depends(get_db)) -> Any:
        return create_entity(db, entity_in)

    @router.patch("/{entity_id}", response_model=read_schema)
    def update_entity_route(entity_id: int, entity_in: update_schema, db: Session = Depends(get_db)) -> Any:
        entity = update_entity(db, entity_id, entity_in)
        if entity is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"{entity_name} not found")
        return entity

    @router.delete("/{entity_id}", status_code=status.HTTP_204_NO_CONTENT)
    def delete_entity_route(entity_id: int, db: Session = Depends(get_db)) -> Response:
        entity = delete_entity(db, entity_id)
        if entity is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"{entity_name} not found")
        return Response(status_code=status.HTTP_204_NO_CONTENT)

    return router
