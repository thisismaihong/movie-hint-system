import Providers from "@/components/providers/Providers";

export default function RootLayout({children}) {
    return (
        <html lang="vi">
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}