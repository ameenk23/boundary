import "./confirmdialog.css";

interface ConfirmDialogProps {

    open: boolean;

    title: string;

    message: string;

    confirmText?: string;

    cancelText?: string;

    danger?: boolean;

    onConfirm: () => void;

    onCancel: () => void;

}

export default function ConfirmDialog({

    open,

    title,

    message,

    confirmText = "OK",

    cancelText = "Cancel",

    danger = false,

    onConfirm,

    onCancel,

}: ConfirmDialogProps) {

    if (!open) {

        return null;

    }

    return (

        <div className="dialog-backdrop">

            <div className="dialog">

                <h2>{title}</h2>

                <p>{message}</p>

                <div className="dialog-buttons">

                    <button
                        onClick={onCancel}
                    >
                        {cancelText}
                    </button>

                    <button
                        className={
                            danger
                                ? "danger"
                                : ""
                        }
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>

                </div>

            </div>

        </div>

    );

}