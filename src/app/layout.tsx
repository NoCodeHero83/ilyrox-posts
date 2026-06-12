import type { Metadata } from "next";
import "../index.css";

export const metadata: Metadata = {
  icons: {
    icon: "/Logo.jpeg",
  },
  title: "ILYROX",
  description: "ILYROX Web App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased font-sans">
        <div className="min-h-screen w-full bg-[#f0f2f5]">
          <header className="bg-[#131622] shadow-lg shadow-[#131622]/20 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-center">
              <div className="flex items-center gap-2 hover:scale-105 transition-all duration-300">
                <div className="bg-[#131622] rounded-lg flex items-center justify-center">
                  <img
                    src="/icon-dark.jpeg"
                    alt="Logo"
                    className="w-24 h-14 rounded-xl"
                  />
                </div>
                {/* <span className="text-white font-bold text-xl tracking-tight sm:block ml-1 cursor-default">
                  ilyrox
                </span> */}
              </div>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
