interface SplitterProps {
    onMouseDown: () => void;
}

export default function Splitter({
    onMouseDown,
}: SplitterProps) {
    return (
        <div
            className="splitter"
            onMouseDown={onMouseDown}
        />
    );
}