import type { ReactNode } from "react";

interface PropertyRowProps {
    label: string;
    children: ReactNode;
}

export default function PropertyRow({
    label,
    children,
}: PropertyRowProps) {

    return (

        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                marginBottom: 18,
            }}
        >

            <label
                style={{
                    fontWeight: 600,
                    fontSize: 13,
                }}
            >
                {label}
            </label>

            {children}

        </div>

    );

}