import { createContext, useContext, useState, type ReactNode } from "react";

export type ExplorerNode =
    | "road_segments"
    | "zones"
    | "drivable_areas"
    | "functional_scenarios"
    | "actors";

interface AppContextType {
    // Workspace
    selectedProjectId: number | null;
    setSelectedProjectId: (id: number | null) => void;

    selectedPlatformId: number | null;
    setSelectedPlatformId: (id: number | null) => void;

    selectedODDId: number | null;
    setSelectedODDId: (id: number | null) => void;

    // Explorer
    selectedExplorerNode: ExplorerNode | null;
    setSelectedExplorerNode: (node: ExplorerNode | null) => void;

    // Selection
    selectedRoadSegmentId: number | null;
    setSelectedRoadSegmentId: (id: number | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({
    children,
}: {
    children: ReactNode;
}) {
    // Workspace
    const [selectedProjectId, setSelectedProjectId] =
        useState<number | null>(null);

    const [selectedPlatformId, setSelectedPlatformId] =
        useState<number | null>(null);

    const [selectedODDId, setSelectedODDId] =
        useState<number | null>(null);

    // Explorer
    const [selectedExplorerNode, setSelectedExplorerNode] =
        useState<ExplorerNode | null>(null);

    // Selection
    const [selectedRoadSegmentId, setSelectedRoadSegmentId] =
        useState<number | null>(null);

    return (
        <AppContext.Provider
            value={{
                // Workspace
                selectedProjectId,
                setSelectedProjectId,

                selectedPlatformId,
                setSelectedPlatformId,

                selectedODDId,
                setSelectedODDId,

                // Explorer
                selectedExplorerNode,
                setSelectedExplorerNode,

                // Selection
                selectedRoadSegmentId,
                setSelectedRoadSegmentId,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error(
            "useAppContext must be used within AppProvider"
        );
    }

    return context;
}