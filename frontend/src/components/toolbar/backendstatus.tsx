import { useEffect, useState } from "react";
import api from "../../services/api";

type HealthResponse = {
    status: string;
    database: string;
    version: string;
};

export default function BackendStatus() {

    const [health, setHealth] = useState<HealthResponse | null>(null);

    useEffect(() => {

        api.get("/health")
            .then((response) => setHealth(response.data))
            .catch(console.error);

    }, []);

    if (!health) {
        return <span>Connecting...</span>;
    }

    return (
        <span>
            🟢 {health.status}
        </span>
    );

}