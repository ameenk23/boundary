import { useEffect, useState } from "react";

import Toolbar from "../components/toolbar/Toolbar";
import CommandBar from "../components/commandbar/commandbar";

import Explorer from "../components/explorer/explorer";
import Grid from "../components/grid/grid";
import MapPanel from "../components/map/mappanel";

import Splitter from "../components/splitter/Splitter";

import "../components/splitter/splitter.css";

export default function MainLayout() {

    const [explorerWidth, setExplorerWidth] = useState(220);
    const [gridWidth, setGridWidth] = useState(750);

    const [dragging, setDragging] =
        useState<"explorer" | "grid" | null>(null);

    useEffect(() => {

        function onMouseMove(e: MouseEvent) {

            if (dragging === "explorer") {

                setExplorerWidth(
                    Math.max(
                        180,
                        Math.min(350, e.clientX)
                    )
                );

            }

            if (dragging === "grid") {

                setGridWidth(
                    Math.max(
                        500,
                        Math.min(
                            1200,
                            e.clientX - explorerWidth - 6
                        )
                    )
                );

            }

        }

        function onMouseUp() {

            setDragging(null);

        }

        window.addEventListener(
            "mousemove",
            onMouseMove
        );

        window.addEventListener(
            "mouseup",
            onMouseUp
        );

        return () => {

            window.removeEventListener(
                "mousemove",
                onMouseMove
            );

            window.removeEventListener(
                "mouseup",
                onMouseUp
            );

        };

    }, [dragging, explorerWidth]);

    return (

        <div className="app-layout">

            <Toolbar />

            <CommandBar />

            <main
                className="workspace"
                style={{
                    gridTemplateColumns: `
                        ${explorerWidth}px
                        6px
                        ${gridWidth}px
                        6px
                        1fr
                    `,
                }}
            >

                <Explorer />

                <Splitter
                    onMouseDown={() =>
                        setDragging("explorer")
                    }
                />

                <section className="editor">

                    <Grid />

                </section>

                <Splitter
                    onMouseDown={() =>
                        setDragging("grid")
                    }
                />

                <aside className="map">

                    <MapPanel />

                </aside>

            </main>

        </div>

    );

}