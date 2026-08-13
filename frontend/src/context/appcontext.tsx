import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

export type ExplorerNode =
    | "road_segments"
    | "zones"
    | "drivable_areas"
    | "functional_scenarios"
    | "actors";

export type ToolMode =
    | "select"
    | "draw_road_segment"
    | "draw_zone"
    | "draw_drivable_area";

export type DialogType =
    | null
    | "road_segment";

interface AppContextType {

    // =========================
    // Workspace
    // =========================

    selectedProjectId: number | null;

    setSelectedProjectId: (
        id: number | null
    ) => void;

    selectedPlatformId: number | null;

    setSelectedPlatformId: (
        id: number | null
    ) => void;

    selectedODDId: number | null;

    setSelectedODDId: (
        id: number | null
    ) => void;

    // =========================
    // Command Mode
    // =========================

    toolMode: ToolMode;

    setToolMode: (
        mode: ToolMode
    ) => void;

    // =========================
    // Dialogs
    // =========================

    dialog: DialogType;

    setDialog: (
        dialog: DialogType
    ) => void;

    // =========================
    // Floating Editor
    // =========================

    editorOpen: boolean;

    setEditorOpen: (
        open: boolean
    ) => void;

    // =========================
    // Explorer
    // =========================

    selectedExplorerNode:
        ExplorerNode | null;

    setSelectedExplorerNode: (
        node: ExplorerNode | null
    ) => void;

    // =========================
    // Pending Entity
    // =========================

    pendingEntity: unknown | null;

    setPendingEntity: (
        entity: unknown | null
    ) => void;

    // =========================
    // Active Map Selection
    // =========================

    selectedRoadSegmentId:
        number | null;

    setSelectedRoadSegmentId: (
        id: number | null
    ) => void;

    // =========================
    // Export Selection
    // =========================

    selectedExportEntities:
        unknown[];

    setSelectedExportEntities: (
        entities: unknown[]
    ) => void;

}

const AppContext = createContext<
    AppContextType | undefined
>(undefined);

export function AppProvider({
    children,
}: {
    children: ReactNode;
}) {

    // =========================
    // Workspace
    // =========================

    const [
        selectedProjectId,
        setSelectedProjectId,
    ] = useState<number | null>(
        null
    );

    const [
        selectedPlatformId,
        setSelectedPlatformId,
    ] = useState<number | null>(
        null
    );

    const [
        selectedODDId,
        setSelectedODDId,
    ] = useState<number | null>(
        null
    );

    // =========================
    // Command Mode
    // =========================

    const [
        toolMode,
        setToolMode,
    ] = useState<ToolMode>(
        "select"
    );

    // =========================
    // Dialogs
    // =========================

    const [
        dialog,
        setDialog,
    ] = useState<DialogType>(
        null
    );

    // =========================
    // Floating Editor
    // =========================

    const [
        editorOpen,
        setEditorOpen,
    ] = useState(false);

    // =========================
    // Pending Entity
    // =========================

    const [
        pendingEntity,
        setPendingEntity,
    ] = useState<unknown | null>(
        null
    );

    // =========================
    // Explorer
    // =========================

    const [
        selectedExplorerNode,
        setSelectedExplorerNode,
    ] = useState<ExplorerNode | null>(
        null
    );

    // =========================
    // Active Map Selection
    // =========================

    const [
        selectedRoadSegmentId,
        setSelectedRoadSegmentId,
    ] = useState<number | null>(
        null
    );

    // =========================
    // Export Selection
    // =========================

    const [
        selectedExportEntities,
        setSelectedExportEntities,
    ] = useState<unknown[]>(
        []
    );

    return (

        <AppContext.Provider
            value={{

                // =========================
                // Workspace
                // =========================

                selectedProjectId,
                setSelectedProjectId,

                selectedPlatformId,
                setSelectedPlatformId,

                selectedODDId,
                setSelectedODDId,

                // =========================
                // Command Mode
                // =========================

                toolMode,
                setToolMode,

                // =========================
                // Dialogs
                // =========================

                dialog,
                setDialog,

                // =========================
                // Floating Editor
                // =========================

                editorOpen,
                setEditorOpen,

                // =========================
                // Explorer
                // =========================

                selectedExplorerNode,
                setSelectedExplorerNode,

                // =========================
                // Pending Entity
                // =========================

                pendingEntity,
                setPendingEntity,

                // =========================
                // Active Map Selection
                // =========================

                selectedRoadSegmentId,
                setSelectedRoadSegmentId,

                // =========================
                // Export Selection
                // =========================

                selectedExportEntities,
                setSelectedExportEntities,

            }}
        >

            {children}

        </AppContext.Provider>

    );

}

export function useAppContext() {

    const context =
        useContext(AppContext);

    if (!context) {

        throw new Error(
            "useAppContext must be used within AppProvider"
        );

    }

    return context;

}