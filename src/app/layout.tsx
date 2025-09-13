// src/app/layout.tsx
import Provider from "~/components/providers/WagmiProvider";
import { Navbar } from "~/components/layout/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background">
        <Provider>
          <Navbar />
          <main className="pt-16"> {/* Account for fixed navbar */}
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
