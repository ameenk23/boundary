import { useAppContext } from "../../../context/appcontext";
import { useZones } from "../../../hooks/usezones";

export default function ZoneGrid() {

    const { selectedODDId } = useAppContext();

    const { zones, loading } = useZones(selectedODDId);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <table className="grid-table">

            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Drivable Area</th>
                </tr>
            </thead>

            <tbody>

                {zones.map(zone => (

                    <tr key={zone.id}>
                        <td>{zone.id}</td>
                        <td>{zone.name}</td>
                        <td>{zone.drivable_area_id}</td>
                    </tr>

                ))}

            </tbody>

        </table>
    );
}