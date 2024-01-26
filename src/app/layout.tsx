import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import PageLayout from "@/components/PageLayout";
import { Toaster } from "sonner";
import { getUser } from "./actions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Strapi Blog App",
  description:
    "A simple blog template app built with Next.js 14 features and Strapi",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Toaster
            duration={4000}
            position="bottom-center"
            closeButton
            richColors
          />
          <PageLayout user={user}>{children}</PageLayout>
        </Providers>
      </body>
    </html>
  );
}
