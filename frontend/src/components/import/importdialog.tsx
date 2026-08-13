import { useRef, useState } from "react";

import "./import.css";

interface ImportDialogProps {
    onClose: () => void;
}

type ImportFormat =
    | "asam_openodd"
    | "custom";

type ImportStep =
    | "format"
    | "file"
    | "success"
    | "error";

export default function ImportDialog({
    onClose,
}: ImportDialogProps) {

    const [
        format,
        setFormat,
    ] = useState<ImportFormat>(
        "asam_openodd"
    );

    const [
        step,
        setStep,
    ] = useState<ImportStep>(
        "format"
    );

    const [
        fileName,
        setFileName,
    ] = useState<string | null>(
        null
    );

    const fileInputRef =
        useRef<HTMLInputElement | null>(
            null
        );

    const handleNext = () => {

        if (step === "format") {

            setStep("file");

            return;

        }

        if (step === "file") {

            fileInputRef.current?.click();

        }

    };

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file =
            event.target.files?.[0];

        if (!file) return;

        const isExcel =
            file.name
                .toLowerCase()
                .endsWith(".xlsx") ||
            file.name
                .toLowerCase()
                .endsWith(".xls");

        if (!isExcel) {

            setFileName(null);

            setStep("error");

            return;

        }

        /*
         * Demo-only import.
         *
         * No backend request is made yet.
         * We simply simulate a successful
         * upload after the user selects
         * an Excel file.
         */

        setFileName(
            file.name
        );

        setStep("success");

    };

    const handleBack = () => {

        if (step === "file") {

            setStep("format");

            return;

        }

        if (step === "error") {

            setStep("file");

            return;

        }

    };

    return (

        <div
            className="import-overlay"
            onMouseDown={(event) => {

                if (
                    event.target ===
                    event.currentTarget
                ) {

                    onClose();

                }

            }}
        >

            <div className="import-dialog">

                {step === "format" && (

                    <>

                        <div className="import-header">

                            <div>

                                <h2>
                                    Import Data
                                </h2>

                                <p>
                                    Choose the format of the
                                    information you want to import.
                                </p>

                            </div>

                            <button
                                className="import-close"
                                onClick={onClose}
                            >
                                ×
                            </button>

                        </div>

                        <div className="import-content">

                            <label className="import-option">

                                <input
                                    type="radio"
                                    name="import-format"
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
                                        Import data structured
                                        according to the
                                        ASAM OpenODD format.
                                    </small>

                                </span>

                            </label>

                            <label className="import-option">

                                <input
                                    type="radio"
                                    name="import-format"
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
                                        Import information
                                        using a custom
                                        AVHub structure.
                                    </small>

                                </span>

                            </label>

                            <div className="import-file-note">

                                <strong>
                                    Excel files only
                                </strong>

                                <span>
                                    Supported formats:
                                    .xlsx and .xls
                                </span>

                            </div>

                        </div>

                        <div className="import-footer">

                            <button
                                className="secondary-button"
                                onClick={onClose}
                            >
                                Cancel
                            </button>

                            <button
                                className="primary-button"
                                onClick={handleNext}
                            >
                                Next
                            </button>

                        </div>

                    </>

                )}

                {step === "file" && (

                    <>

                        <div className="import-header">

                            <div>

                                <h2>
                                    Select Excel File
                                </h2>

                                <p>
                                    Choose an Excel file
                                    to import into AVHub.
                                </p>

                            </div>

                            <button
                                className="import-close"
                                onClick={onClose}
                            >
                                ×
                            </button>

                        </div>

                        <div className="import-content">

                            <div className="import-upload-area">

                                <div className="upload-icon">
                                    ↑
                                </div>

                                <strong>
                                    Choose an Excel file
                                </strong>

                                <span>
                                    .xlsx or .xls
                                </span>

                                <button
                                    className="secondary-button"
                                    onClick={() =>
                                        fileInputRef
                                            .current
                                            ?.click()
                                    }
                                >
                                    Choose File
                                </button>

                            </div>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".xlsx,.xls"
                                onChange={
                                    handleFileChange
                                }
                                hidden
                            />

                        </div>

                        <div className="import-footer">

                            <button
                                className="secondary-button"
                                onClick={handleBack}
                            >
                                Back
                            </button>

                            <button
                                className="primary-button"
                                onClick={handleNext}
                            >
                                Next
                            </button>

                        </div>

                    </>

                )}

                {step === "success" && (

                    <>

                        <div className="import-header">

                            <div>

                                <h2>
                                    Upload Successful
                                </h2>

                                <p>
                                    The Excel file was
                                    successfully selected.
                                </p>

                            </div>

                            <button
                                className="import-close"
                                onClick={onClose}
                            >
                                ×
                            </button>

                        </div>

                        <div className="import-content">

                            <div className="import-success">

                                <div className="success-icon">
                                    ✓
                                </div>

                                <strong>
                                    {fileName}
                                </strong>

                                <span>
                                    Ready to import as a new
                                    AVHub project.
                                </span>

                            </div>

                        </div>

                        <div className="import-footer">

                            <button
                                className="primary-button"
                                onClick={onClose}
                            >
                                Done
                            </button>

                        </div>

                    </>

                )}

                {step === "error" && (

                    <>

                        <div className="import-header">

                            <div>

                                <h2>
                                    Upload Failed
                                </h2>

                                <p>
                                    The selected file could
                                    not be accepted.
                                </p>

                            </div>

                            <button
                                className="import-close"
                                onClick={onClose}
                            >
                                ×
                            </button>

                        </div>

                        <div className="import-content">

                            <div className="import-error">

                                <div className="error-icon">
                                    !
                                </div>

                                <strong>
                                    Unsupported file
                                </strong>

                                <span>
                                    Please select an Excel
                                    file (.xlsx or .xls).
                                </span>

                            </div>

                        </div>

                        <div className="import-footer">

                            <button
                                className="secondary-button"
                                onClick={handleBack}
                            >
                                Back
                            </button>

                        </div>

                    </>

                )}

            </div>

        </div>

    );

}