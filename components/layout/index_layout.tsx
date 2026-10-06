export default function IndexLayout({children}: {children: React.ReactNode}) {
    return (
        <main className="max-w-6xl mx-auto px-6 w-full flex-1 flex flex-col gap-6">
            {children}
        </main>
    );
}