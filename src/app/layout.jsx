import "./globals.css";

export const metadata = {
    charset: "UTF-8",
    title: "COM-POL",
    description: "Página de inicio de la aplicación policial",
    script: "https://kit.fontawesome.com/88239f68d2.js"
};

export default function RootLayout({ children }) {
    return (
        <html lang="es-MX">
            <head>
                <link rel="logo COM-POL" href="/favicon.ico" type="image/x-icon" />
                <link href='https://fonts.googleapis.com/css?family=Blinker' rel='stylesheet' />
                <script src="https://kit.fontawesome.com/88239f68d2.js" crossOrigin="anonymous"></script>
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
