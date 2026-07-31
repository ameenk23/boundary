import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import type {
    ColDef,
    FirstDataRenderedEvent,
    RowClickedEvent,
} from "ag-grid-community";

import { useAppContext } from "../../../context/appcontext";
import { useRoadSegments } from "../../../hooks/useroadsegments";

export default function RoadSegmentGrid() {
    const {
        selectedODDId,
        selectedExplorerNode,
        setSelectedRoadSegmentId,
    } = useAppContext();

    const {
        roadSegments,
        loading,
    } = useRoadSegments(selectedODDId);

    const columnDefs = useMemo<ColDef[]>((
        () => [
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
        ]
    ), []);

    const defaultColDef = useMemo<ColDef>(() => ({
        sortable: true,
        filter: true,
        resizable: true,
        editable: false,
        flex: 1,
        minWidth: 120,
    }), []);

    const onFirstDataRendered = (
        params: FirstDataRenderedEvent
    ) => {
        params.api.sizeColumnsToFit();
    };

    const onRowClicked = (
        event: RowClickedEvent
    ) => {
        setSelectedRoadSegmentId(event.data.id);

        console.log("Selected Road Segment:", event.data.id);
    };

    if (selectedExplorerNode !== "road_segments") {
        return <div>Select "Road Segments" in the Explorer</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AgGridReact
            rowData={roadSegments}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection={{
                mode: "singleRow",
            }}
            onFirstDataRendered={onFirstDataRendered}
            onRowClicked={onRowClicked}
        />
    );
}