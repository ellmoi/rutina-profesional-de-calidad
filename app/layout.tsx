import type { Metadata, Viewport } from "next";
import "./globals.css";

// METADATOS: nombre, descripción y comportamiento instalable de la aplicación.
export const metadata: Metadata = {
  title: "NORTE — Sistema personal de Moisés",
  description: "Planeador personal, hábitos y roadmap profesional hacia ciberseguridad.",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/favicon.svg", apple: "/favicon.svg" },
};
export const viewport: Viewport = { themeColor: "#0c1114", width: "device-width", initialScale: 1 };

// LAYOUT RAÍZ: envuelve todas las pantallas y declara el idioma del contenido.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
