import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import Image from "next/image";

export default function Home() {
	return (
		<section className="h-full flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<Image
				src="/logo.png"
				alt="BlockBoard Logo"
				className="drop-shadow-[0_60px_60px_rgba(0,0,0,0.6)]"
				width={350}
				height={350}
			/>
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title({ color: "green" })}>Earn <span className="text-black dark:text-white">passive income 💸 &nbsp;</span></h1>
				<h1 className={title({ color: "blue" })}>Advertise <span className="text-black dark:text-white">cheaply 📈 &nbsp;</span></h1>
			</div>

			{/* <div className="flex gap-3">
				<Link
					isExternal
					as={NextLink}
					href={siteConfig.links.docs}
					className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
				>
					Documentation
				</Link>
				<Link
					isExternal
					as={NextLink}
					className={buttonStyles({ variant: "bordered", radius: "full" })}
					href={siteConfig.links.github}
				>
					<GithubIcon size={20} />
					GitHub
				</Link>
			</div>

			<div className="mt-8">
				<Snippet hideSymbol hideCopyButton variant="flat">
					<span>
						Get started by editing <Code color="primary">app/page.tsx</Code>
					</span>
				</Snippet>
			</div> */}
		</section>
	);
}
