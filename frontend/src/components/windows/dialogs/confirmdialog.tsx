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

    confirmText = "Confirm",

    cancelText = "Cancel",

    danger = false,

    onConfirm,

    onCancel,

}: ConfirmDialogProps) {

    if (!open) return null;

    return (

        <div className="dialog-overlay">

            <div className="dialog">

                <div className="dialog-header">

                    <h3>{title}</h3>

                </div>

                <div className="dialog-body">

                    <p>{message}</p>

                </div>

                <div className="dialog-footer">

                    <button
                        className="dialog-button"
                        onClick={onCancel}
                    >
                        {cancelText}
                    </button>

                    <button
                        className={
                            danger
                                ? "dialog-button danger"
                                : "dialog-button primary"
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