import { Link, usePage } from "@inertiajs/react";

export default function Layout({ children }) {
    const { url } = usePage(); // Get the current URL

    const isHomePage = url === "/";
    return (
        <div className={`flex flex-col min-h-screen`}>
            <header
                className={`sticky top-0 z-50 ${
                    isHomePage ? "" : "bg-slate-700"
                }`}
            >
                <nav className="container px-4 py-3 mx-auto">
                    <ul className="flex space-x-4">
                        <li>
                            <Link
                                href="/"
                                className="text-white transition duration-300 hover:text-slate-400"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/rooms"
                                className="text-white transition duration-300 hover:text-slate-400"
                            >
                                Rooms
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className="container flex-grow mx-auto">{children}</main>
        </div>
    );
}
