export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "BlockBoard",
	description: "Elevate Your Message, Securely Shared: Blockboard - Where Blockchain and Billboards Converge!",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "User",
			href: "/user",
		},
		{
			label: "Company",
			href: "/company",
		}
	],
	links: {
		github: "https://github.com/nextui-org/nextui",
		twitter: "https://twitter.com/getnextui",
		docs: "https://nextui.org",
		discord: "https://discord.gg/9b6yyZKmH4",
    	sponsor: "https://patreon.com/jrgarciadev"
	},
};
