import "./globals.css";
import Providers from "@/components/providers/Providers";

export const metadata = {
    title: "Movie Hint",
    description: "Movie recommendation system",
};

export default function RootLayout({ children }) {
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