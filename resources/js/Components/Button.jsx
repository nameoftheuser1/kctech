export default function Button({ type = "submit", disabled, processing, text, className, onClick }) {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 ${className}`}
        >
            {processing ? "Processing..." : text}
        </button>
    );
}
