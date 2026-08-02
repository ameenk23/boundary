interface EnumSelectProps {

    value: string;

    options: string[];

    onChange: (value: string) => void;

}

export default function EnumSelect({
    value,
    options,
    onChange,
}: EnumSelectProps) {

    return (

        <select
            value={value}
            onChange={e => onChange(e.target.value)}
            style={{
                width: "100%",
                padding: "8px",
            }}
        >

            {options.map(option => (

                <option
                    key={option}
                    value={option}
                >
                    {option}
                </option>

            ))}

        </select>

    );

}