import "./globals.css";

export const metadata = {
    title: "Duong Dinh - Portfolio",
    description: "Cyber Security Enthusiast | Personal Portfolio",
};

export default function RootLayout({ children }) {
    return (
        <html lang="vi">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
            </head>
            <body>{children}</body>
        </html>
    );
}
