import { Link, usePage } from "@inertiajs/react";

export default function Layout({ children }) {
    const { url, auth } = usePage().props;
    const isHomePage = url === "/";
    const isAuthenticated = auth && auth.user;

    return (
        <div className="flex flex-col min-h-screen">
            <header
                className={`sticky top-0 z-50 ${
                    isHomePage ? "" : "bg-white"
                }`}
            >
                <nav className="container px-4 py-3 mx-auto">
                    <div className="flex justify-between items-center">
                        <ul className="flex space-x-4">
                            <li>
                                <Link
                                    href="/"
                                    className="text-black transition duration-300 hover:text-blue-500"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/rooms"
                                    className="text-black transition duration-300 hover:text-blue-500"
                                >
                                    Rooms
                                </Link>
                            </li>
                        </ul>
                        {!isAuthenticated ? (
                            <Link
                                href="/login"
                                className="text-blue-500 "
                            >
                                Sign In
                            </Link>
                        ) : (
                            <span className="text-black">
                                Welcome, {auth.user.name}
                                <Link
                                    href="/logout"
                                    className="text-black bg-blue-600"
                                >
                                    Sign In
                                </Link>
                            </span>
                        )}
                    </div>
                </nav>
            </header>
            <main className="container flex-grow mx-auto">{children}</main>
        </div>
    );
}
