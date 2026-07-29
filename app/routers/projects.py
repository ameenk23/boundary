"""HTTP routes for Project resources."""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from app.crud import create_project, delete_project, get_project, get_projects, update_project
from app.database import get_db
from app.schemas import ProjectCreate, ProjectRead, ProjectUpdate


router = APIRouter(prefix="/projects", tags=["projects"])


@router.get("", response_model=list[ProjectRead])
def list_projects(db: Session = Depends(get_db)) -> list[ProjectRead]:
    """Return active projects."""

    return get_projects(db)


@router.get("/{project_id}", response_model=ProjectRead)
def read_project(project_id: int, db: Session = Depends(get_db)) -> ProjectRead:
    """Return one active project."""

    project = get_project(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    return project


@router.post("", response_model=ProjectRead, status_code=status.HTTP_201_CREATED)
def create_project_route(project_in: ProjectCreate, db: Session = Depends(get_db)) -> ProjectRead:
    """Create and return a project."""

    return create_project(db, project_in)


@router.patch("/{project_id}", response_model=ProjectRead)
def update_project_route(
    project_id: int,
    project_in: ProjectUpdate,
    db: Session = Depends(get_db),
) -> ProjectRead:
    """Update and return an active project."""

    project = update_project(db, project_id, project_in)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    return project


@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project_route(project_id: int, db: Session = Depends(get_db)) -> Response:
    """Soft-delete an active project."""

    project = delete_project(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    return Response(status_code=status.HTTP_204_NO_CONTENT)
