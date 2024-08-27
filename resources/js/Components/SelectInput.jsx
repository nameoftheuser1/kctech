export default function SelectInput({ id, label, value, onChange, error, options, className }) {
    return (
        <div className={className}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}:
            </label>
            <select
                id={id}
                value={value}
                onChange={onChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${error ? 'border-red-500' : ''}`}
            >
                <option value="">Select {label.toLowerCase()}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}
