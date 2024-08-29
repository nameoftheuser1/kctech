import { Link } from "@inertiajs/react";

const Pagination = ({ links }) => {
    const previousLink = links.find((link) => link.label.includes("&laquo;"));
    const nextLink = links.find((link) => link.label.includes("&raquo;"));

    return (
        <div className="mt-4 flex justify-center items-center">
            <Link
                href={previousLink?.url || "#"}
                className={`p-2 border rounded mx-1 ${
                    !previousLink?.url
                        ? "hidden opacity-50"
                        : "hover:bg-blue-500 hover:text-white"
                }`}
                disabled={!previousLink?.url}
            >
                Previous
            </Link>

            {links
                .filter(
                    (link) =>
                        !link.label.includes("&laquo;") &&
                        !link.label.includes("&raquo;")
                )
                .map((link) => (
                    <Link
                        key={link.label}
                        href={link.url || "#"}
                        className={`p-2 border rounded mx-1 ${
                            link.active
                                ? "bg-blue-500 text-white"
                                : "hover:bg-blue-500 hover:text-white"
                        } ${!link.url ? "opacity-50" : ""}`}
                        disabled={!link.url}
                    >
                        {link.label}
                    </Link>
                ))}

            <Link
                href={nextLink?.url || "#"}
                className={`p-2 border rounded mx-1 ${
                    !nextLink?.url
                        ? "hidden opacity-50"
                        : "hover:bg-blue-500 hover:text-white"
                }`}
                disabled={!nextLink?.url}
            >
                Next
            </Link>
        </div>
    );
};

export default Pagination;
