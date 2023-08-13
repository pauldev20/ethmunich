import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";

export const metadata: Metadata = {
	title: "BlockBoard",
	description: "Elevate Your Message, Securely Shared: Blockboard - Where Blockchain and Billboards Converge!",
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
					<div className="relative flex flex-col h-screen">
						<Navbar 
							links={[
								{label: "Home", href: "/"},
								{label: "User", href: "/user"},
								{label: "Company", href: "/company"}
							]}
						/>
						<main className="container mx-auto max-w-7xl px-6 flex-grow">
							{children}
						</main>
						<footer className="w-full flex items-center justify-center py-3">
							<Link
								isExternal
								className="flex items-center gap-1 text-current"
								href="https://www.42heilbronn.de/en/"
							>
								<span className="text-default-600">Made with ❤️ by</span>
								<p className="text-primary">42 Heilbronn Hackerdojo</p>
							</Link>
						</footer>
					</div>
				</Providers>
			</body>
		</html>
	);
}
