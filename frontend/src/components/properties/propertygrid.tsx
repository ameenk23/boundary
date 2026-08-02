import type { PropertyItem } from "./propertytypes";

interface PropertyGridProps {
    properties: PropertyItem[];
}

export default function PropertyGrid({
    properties,
}: PropertyGridProps) {

    return (

        <table className="property-grid">

            <tbody>

                {properties.map(property => (

                    <tr key={property.label}>

                        <td className="property-label">
                            {property.label}
                        </td>

                        <td className="property-value">
                            {property.value ?? "-"}
                        </td>

                    </tr>

                ))}

            </tbody>

        </table>

    );

}