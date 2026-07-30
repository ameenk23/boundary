import Toolbar from "../components/toolbar/Toolbar";
export default function MainLayout() {
    return (
        <div className="app-layout">

            <Toolbar />

            <main className="workspace">
                <aside className="explorer">
                    Explorer
                </aside>

                <section className="editor">
                    Spreadsheet
                </section>

                <aside className="map">
                    Map
                </aside>
            </main>

            <footer className="properties">
                Properties Panel
            </footer>
        </div>
    );
}