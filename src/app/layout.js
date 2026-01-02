import "./globals.css";
import Preloader from "@/components/Preloader";

export const metadata = {
  title: "Shajar Ali | Portfolio",
  description: "Creative Design Studio & Portfolio of Shajar Ali",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-f1 antialiased">
        <Preloader />
        {children}
      </body>
    </html>
  );
}
