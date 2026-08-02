import "./appwindow.css";
import type { ReactNode } from "react";

interface AppWindowProps {

    open: boolean;

    title: string;

    children: ReactNode;

    onClose: () => void;

}

export default function AppWindow({

    open,

    title,

    children,

    onClose,

}: AppWindowProps) {

    if (!open) return null;

    return (

        <div className="window-overlay">

            <div className="app-window">

                <div className="window-header">

                    <h2>{title}</h2>

                    <button
                        className="window-close"
                        onClick={onClose}
                    >
                        ✕
                    </button>

                </div>

                <div className="window-body">

                    {children}

                </div>

            </div>

        </div>

    );

}