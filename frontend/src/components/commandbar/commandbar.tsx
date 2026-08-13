import { useState } from "react";

import "./commandbar.css";

import { useAppContext } from "../../context/appcontext";

import ImportDialog from "../import/importdialog";
import ExportDialog from "../export/exportdialog";

export default function CommandBar() {

    const {
        selectedExplorerNode,
        selectedExportEntity,
        setToolMode,
        setDialog,
    } = useAppContext();

    const [
        importOpen,
        setImportOpen,
    ] = useState(false);

    const [
        exportOpen,
        setExportOpen,
    ] = useState(false);

    const handleAdd = () => {

        switch (selectedExplorerNode) {

            case "road_segments":

                setDialog(
                    "road_segment"
                );

                break;

            case "zones":

                setToolMode(
                    "draw_zone"
                );

                break;

            case "drivable_areas":

                setToolMode(
                    "draw_drivable_area"
                );

                break;

            default:

                break;

        }

    };

    return (

        <>

            <div className="commandbar">

                <button
                    onClick={handleAdd}
                    disabled={
                        !selectedExplorerNode
                    }
                >
                    + Add
                </button>

                <button
                    onClick={() =>
                        setImportOpen(true)
                    }
                >
                    Import
                </button>

                <button
                    disabled={
                        !selectedExportEntity
                    }
                    onClick={() =>
                        setExportOpen(true)
                    }
                >
                    Export
                </button>

            </div>

            {importOpen && (

                <ImportDialog
                    onClose={() =>
                        setImportOpen(false)
                    }
                />

            )}

            {exportOpen && (

                <ExportDialog
                    onClose={() =>
                        setExportOpen(false)
                    }
                />

            )}

        </>

    );

}