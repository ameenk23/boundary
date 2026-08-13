import { useState } from "react";

import * as XLSX from "xlsx";

import "./export.css";

import { useAppContext } from "../../context/appcontext";

interface ExportDialogProps {
    onClose: () => void;
}

type ExportFormat =
    | "asam_openodd"
    | "xlsx"
    | "custom";

export default function ExportDialog({
    onClose,
}: ExportDialogProps) {

    const {
        selectedExportEntity,
        selectedExplorerNode,
    } = useAppContext();

    const [
        format,
        setFormat,
    ] = useState<ExportFormat>(
        "asam_openodd"
    );

    const handleDownload = () => {

        if (!selectedExportEntity) {
            return;
        }

        const entity =
            selectedExportEntity as Record<
                string,
                unknown
            >;

        /*
         * For the demo, all three formats
         * produce an Excel workbook.
         *
         * The actual ASAM OpenODD mapping
         * can be connected later.
         */

        const worksheetData = [
            {
                Entity:
                    selectedExplorerNode ??
                    "entity",

                ID:
                    entity.id ?? "",

                Name:
                    entity.name ?? "",

                Description:
                    entity.description ?? "",

                Road_Type:
                    entity.road_type ?? "",

                Surface_Type:
                    entity.surface_type ?? "",

                Direction:
                    entity.direction ?? "",

                Speed_Limit_kph:
                    entity.speed_limit_kph ?? "",

                Geometry:
                    entity.geometry ?? "",
            },
        ];

        const worksheet =
            XLSX.utils.json_to_sheet(
                worksheetData
            );

        const workbook =
            XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Export"
        );

        let filename =
            "avhub-export.xlsx";

        if (
            format ===
            "asam_openodd"
        ) {

            filename =
                "avhub-asam-openodd.xlsx";

        }

        if (
            format ===
            "custom"
        ) {

            filename =
                "avhub-custom.xlsx";

        }

        XLSX.writeFile(
            workbook,
            filename
        );

        onClose();

    };

    return (

        <div
            className="export-overlay"
            onMouseDown={(event) => {

                if (
                    event.target ===
                    event.currentTarget
                ) {

                    onClose();

                }

            }}
        >

            <div className="export-dialog">

                <div className="export-header">

                    <div>

                        <h2>
                            Export Data
                        </h2>

                        <p>
                            Choose a format for the
                            selected data.
                        </p>

                    </div>

                    <button
                        className="export-close"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>

                <div className="export-content">

                    <label className="export-option">

                        <input
                            type="radio"
                            name="export-format"
                            checked={
                                format ===
                                "asam_openodd"
                            }
                            onChange={() =>
                                setFormat(
                                    "asam_openodd"
                                )
                            }
                        />

                        <span>

                            <strong>
                                ASAM OpenODD
                            </strong>

                            <small>
                                Export using the
                                ASAM OpenODD format.
                            </small>

                        </span>

                    </label>

                    <label className="export-option">

                        <input
                            type="radio"
                            name="export-format"
                            checked={
                                format ===
                                "xlsx"
                            }
                            onChange={() =>
                                setFormat(
                                    "xlsx"
                                )
                            }
                        />

                        <span>

                            <strong>
                                Excel (.xlsx)
                            </strong>

                            <small>
                                Export the selected
                                information as a
                                spreadsheet.
                            </small>

                        </span>

                    </label>

                    <label className="export-option">

                        <input
                            type="radio"
                            name="export-format"
                            checked={
                                format ===
                                "custom"
                            }
                            onChange={() =>
                                setFormat(
                                    "custom"
                                )
                            }
                        />

                        <span>

                            <strong>
                                Custom
                            </strong>

                            <small>
                                Export using a custom
                                AVHub structure.
                            </small>

                        </span>

                    </label>

                </div>

                <div className="export-footer">

                    <button
                        className="secondary-button"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="primary-button"
                        onClick={
                            handleDownload
                        }
                    >
                        Download
                    </button>

                </div>

            </div>

        </div>

    );

}