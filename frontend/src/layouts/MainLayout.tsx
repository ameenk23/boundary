import Toolbar from "../components/toolbar/Toolbar";
import Explorer from "../components/explorer/explorer";
import Grid from "../components/grid/grid";
import MapPanel from "../components/map/mappanel";

export default function MainLayout() {
    return (
        <div className="app-layout">
            <Toolbar />

            <main className="workspace">
                <Explorer />

                <section className="editor">
                    <Grid />
                </section>

                <aside className="map">
                    <MapPanel />
                </aside>
            </main>

            <footer className="properties">
                Properties Panel
            </footer>
        </div>
    );
}