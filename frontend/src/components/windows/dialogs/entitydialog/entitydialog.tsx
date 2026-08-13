import "./Entitydialog.css";

interface EntityDialogProps {

    open: boolean;

    title: string;

    children: React.ReactNode;

    onCancel: () => void;

    onCreate: () => void;

    createLabel?: string;

}

export default function EntityDialog({

    open,

    title,

    children,

    onCancel,

    onCreate,

    createLabel = "Create",

}: EntityDialogProps) {

    if (!open) {

        return null;

    }

    return (

        <div className="entity-dialog-backdrop">

            <div className="entity-dialog">

                <div className="entity-dialog-header">

                    <h2>{title}</h2>

                </div>

                <div className="entity-dialog-content">

                    {children}

                </div>

                <div className="entity-dialog-footer">

                    <button
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        className="primary"
                        onClick={onCreate}
                    >
                        {createLabel}
                    </button>

                </div>

            </div>

        </div>

    );

}