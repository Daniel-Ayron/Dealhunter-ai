import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SideMenu } from "@/components/SideMenu";



const roboto = Roboto({
  weight: ['400', '500', '700'], 
  subsets: ['latin'],            
  display: 'swap',
  variable: '--font-roboto',     
});

export const metadata: Metadata = {
  title: "DealHunter AI",
  description: "Monitore preços em tempo real",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="{roboto.variable}" >
      <body className={`${roboto.className} antialiased`}>
        <TooltipProvider>
          <SidebarProvider>
            <SideMenu />
            <main className="w-full">
              <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger />
              </header>
              <div className="p-4">
                {children}
              </div>
            </main>
          </SidebarProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}