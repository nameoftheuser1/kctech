import { Link } from '@inertiajs/react';

export default function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 bg-white">
                <nav className="container px-4 py-3 mx-auto">
                    <ul className="flex space-x-4">
                        <li>
                            <Link
                                href="/"
                                className="text-blue-600 transition duration-300 hover:text-blue-800"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/room"
                                className="text-blue-600 transition duration-300 hover:text-blue-800"
                            >
                                Rooms
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className="container flex-grow px-4 py-8 mx-auto">
                {children}
            </main>
        </div>
    )
}
