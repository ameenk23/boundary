import MainLayout from "./layouts/MainLayout";

import AppWindow from "./components/windows/AppWindow/AppWindow";

import RoadSegmentEditor from "./components/editors/roadsegment/roadsegmenteditor";

import { useAppContext } from "./context/appcontext";

function App() {

    const {

        editorOpen,

        setEditorOpen,

        selectedExplorerNode,

    } = useAppContext();

    return (

        <>

            <MainLayout />

            <AppWindow

                open={
                    editorOpen &&
                    selectedExplorerNode === "road_segments"
                }

                title="🛣 Road Segment"

                onClose={() =>
                    setEditorOpen(false)
                }

            >

                <RoadSegmentEditor />

            </AppWindow>

        </>

    );

}

export default App;