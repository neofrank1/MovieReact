export default function IndexLayout({children}: {children: React.ReactNode}) {
    return (
        <main className="mx-auto max-w-6xl px-6">
            {children}
        </main>
    );
}