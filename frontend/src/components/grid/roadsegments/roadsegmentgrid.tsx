import {
    useMemo,
    useEffect,
    useRef,
} from "react";

import {
    AgGridReact,
} from "ag-grid-react";

import type {
    ColDef,
    FirstDataRenderedEvent,
    GridReadyEvent,
    GridApi,
    RowClickedEvent,
    SelectionChangedEvent,
} from "ag-grid-community";

import {
    useAppContext,
} from "../../../context/appcontext";

import {
    useRoadSegments,
} from "../../../hooks/useroadsegments";

export default function RoadSegmentGrid() {

    const gridApiRef =
        useRef<GridApi | null>(null);

    const {
        selectedODDId,
        selectedExplorerNode,

        selectedRoadSegmentId,
        setSelectedRoadSegmentId,

        setSelectedExportEntities,

        setEditorOpen,

    } = useAppContext();

    const {
        roadSegments,
        loading,
    } = useRoadSegments(
        selectedODDId
    );

    const columnDefs =
        useMemo<ColDef[]>(() => [

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

    const defaultColDef =
        useMemo<ColDef>(() => ({

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

        gridApiRef.current =
            event.api;

    };

    const onFirstDataRendered = (
        params: FirstDataRenderedEvent
    ) => {

        params.api.sizeColumnsToFit();

    };

    /*
     * Clicking the row continues to control
     * the active road segment on the map.
     *
     * This is intentionally separate from
     * export selection.
     */
    const onRowClicked = (
        event: RowClickedEvent
    ) => {

        setSelectedRoadSegmentId(
            event.data.id
        );

    };

    /*
     * Checkbox selection controls what will
     * be exported.
     */
    const onSelectionChanged = (
        event: SelectionChangedEvent
    ) => {

        const selectedRows =
            event.api.getSelectedRows();

        setSelectedExportEntities(
            selectedRows
        );

    };

    const onCellDoubleClicked = () => {

        setEditorOpen(true);

    };

    /*
     * Highlight the road segment that is
     * currently active on the map.
     *
     * This replaces the old AG Grid
     * selected-row mechanism for map
     * selection.
     */
    const getRowClass = (
        params: {
            data?: {
                id?: number;
            };
        }
    ) => {

        if (
            params.data?.id ===
            selectedRoadSegmentId
        ) {

            return "map-active-row";

        }

        return "";

    };

    /*
     * Keep the grid scrolled to the active
     * road segment when it is selected from
     * the map.
     *
     * We deliberately do NOT call
     * select/deselect here because AG Grid
     * selection now belongs to Export.
     */
    useEffect(() => {

        const api =
            gridApiRef.current;

        if (!api) return;

        if (
            selectedRoadSegmentId ==
            null
        ) return;

        const node =
            api.getRowNode(
                selectedRoadSegmentId.toString()
            );

        if (!node) return;

        api.ensureNodeVisible(
            node
        );

    }, [
        selectedRoadSegmentId,
    ]);

    if (
        selectedExplorerNode !==
        "road_segments"
    ) {

        return (

            <div>

                Select "Road Segments"
                in the Explorer

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

            rowData={
                roadSegments
            }

            getRowId={(params) =>
                params.data.id.toString()
            }

            columnDefs={
                columnDefs
            }

            defaultColDef={
                defaultColDef
            }

            rowSelection={{
                mode: "multiRow",
                checkboxes: true,
                headerCheckbox: false,
                enableClickSelection: false,
            }}

            getRowClass={
                getRowClass
            }

            onGridReady={
                onGridReady
            }

            onFirstDataRendered={
                onFirstDataRendered
            }

            onRowClicked={
                onRowClicked
            }

            onSelectionChanged={
                onSelectionChanged
            }

            onCellDoubleClicked={
                onCellDoubleClicked
            }

        />

    );

}