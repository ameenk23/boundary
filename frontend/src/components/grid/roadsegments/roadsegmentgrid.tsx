import { useMemo, useEffect, useRef } from "react";

import { AgGridReact } from "ag-grid-react";

import type {
    ColDef,
    FirstDataRenderedEvent,
    GridReadyEvent,
    GridApi,
    RowClickedEvent,
} from "ag-grid-community";

import { useAppContext } from "../../../context/appcontext";
import { useRoadSegments } from "../../../hooks/useroadsegments";

export default function RoadSegmentGrid() {

    const gridApiRef = useRef<GridApi | null>(null);

    const {
        selectedODDId,
        selectedExplorerNode,
        selectedRoadSegmentId,
        setSelectedRoadSegmentId,
        setEditorOpen,
    } = useAppContext();

    const {
        roadSegments,
        loading,
    } = useRoadSegments(selectedODDId);

    const columnDefs = useMemo<ColDef[]>(() => [

        {
            field: "id",
            maxWidth: 80,
        },

        {
            field: "name",
        },

        {
            field: "road_type",
            headerName: "Road Type",
        },

        {
            field: "speed_limit_kph",
            headerName: "Speed",
            maxWidth: 100,
        },

    ], []);

    const defaultColDef = useMemo<ColDef>(() => ({

        sortable: true,
        filter: true,
        resizable: true,
        editable: false,

        flex: 1,
        minWidth: 120,

    }), []);

    const onGridReady = (
        event: GridReadyEvent
    ) => {

        gridApiRef.current = event.api;

    };

    const onFirstDataRendered = (
        params: FirstDataRenderedEvent
    ) => {

        params.api.sizeColumnsToFit();

    };

    const onRowClicked = (
        event: RowClickedEvent
    ) => {

        setSelectedRoadSegmentId(
            event.data.id
        );

    };

    const onCellDoubleClicked = () => {

        setEditorOpen(true);

    };

    useEffect(() => {

        const api = gridApiRef.current;

        if (!api) return;
        if (selectedRoadSegmentId == null) return;

        api.deselectAll();

        const node = api.getRowNode(
            selectedRoadSegmentId.toString()
        );

        if (!node) return;

        node.setSelected(true);

        api.ensureNodeVisible(node);

    }, [selectedRoadSegmentId]);

    if (selectedExplorerNode !== "road_segments") {

        return (
            <div>
                Select "Road Segments" in the Explorer
            </div>
        );

    }

    if (loading) {

        return (
            <div>
                Loading...
            </div>
        );

    }

    return (

        <AgGridReact

            rowData={roadSegments}

            getRowId={(params) =>
                params.data.id.toString()
            }

            columnDefs={columnDefs}

            defaultColDef={defaultColDef}

            rowSelection={{
                mode: "singleRow",
            }}

            onGridReady={onGridReady}

            onFirstDataRendered={onFirstDataRendered}

            onRowClicked={onRowClicked}

            onCellDoubleClicked={onCellDoubleClicked}

        />

    );

}