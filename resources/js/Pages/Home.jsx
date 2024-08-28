export default function Home() {
    return (
        <>
            <div className="min-h-[80svh] w-full">
                <div className="absolute inset-0 bg-home bg-cover bg-top w-screen h-[80svh]">
                    <div className="text-white flex justify-center items-center h-full cursor-default text-[120px] flex-col">
                        Life is beautiful
                        <p className="text-2xl">Enjoy it with nature</p>
                    </div>
                </div>
            </div>
            <section id="about">
                About this resort
            </section>
        </>
    );
}
