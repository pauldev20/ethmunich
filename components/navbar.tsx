'use client';
import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { Link as NextUiLink } from "@nextui-org/link";
import { ThemeSwitch } from "@/components/theme-switch";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useDisclosure } from "@nextui-org/react";
import { LoginModal } from "./loginModal";
import { SignUpModal } from "./signUpModal";
import { useWallet } from "@/providers/walletProvider";
import { useUser } from "@/providers/userProvider";
import Image from "next/image";

export interface NavbarLinkProps {
	href: string;
	label: string;
}

export interface NavbarProps {
	links?: NavbarLinkProps[];
}

export const Navbar = ({links}: NavbarProps) => {
	const pathname = usePathname();
	const { token, mutateToken } = useUser();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { connected, connectWallet } = useWallet();
	const {isOpen: isOpenLogin, onOpen: onOpenLogin, onOpenChange: onOpenChangeLogin} = useDisclosure();
	const {isOpen: isOpenSignup, onOpen: onOpenSignup, onOpenChange: onOpenChangeSignup} = useDisclosure();

	return (<>
		<NextUINavbar
			isBordered
			classNames={{
				item: [
				"flex",
				"relative",
				"h-full",
				"items-center",
				"data-[active=true]:after:content-['']",
				"data-[active=true]:after:absolute",
				"data-[active=true]:after:bottom-0",
				"data-[active=true]:after:left-0",
				"data-[active=true]:after:right-0",
				"data-[active=true]:after:h-[2px]",
				"data-[active=true]:after:rounded-[2px]",
				"data-[active=true]:after:bg-primary",
				],
			}}
		>
			<NavbarContent>
				<NavbarMenuToggle
				aria-label={isMenuOpen ? "Close menu" : "Open menu"}
				className="sm:hidden"
				/>
				<NavbarBrand>
					<Image src="/logo.png" alt="BlockBoard Logo" width={100} height={100} className="!drop-shadow-2xl"/>
				</NavbarBrand>
			</NavbarContent>

      		<NavbarContent className="hidden sm:flex gap-4" justify="center">
				{
					links?.map((link, index) => (
						<NavbarItem isActive={pathname == link.href} key={index}>
							<Link color={pathname != link.href ? "foreground" : "primary"} href={link.href}>{link.label}</Link>
						</NavbarItem>
					))
				}
      		</NavbarContent>

      		<NavbarContent justify="end">
			  	<NavbarItem>
					<ThemeSwitch/>
				</NavbarItem>
				{(pathname == "/company" && token == "") && (<>
					<NavbarItem>
						<NextUiLink onPress={onOpenLogin} className="cursor-pointer">Login</NextUiLink>
					</NavbarItem>
					<NavbarItem>
						<Button onPress={onOpenSignup} color="primary" href="#" variant="flat">
							Sign Up
						</Button>
					</NavbarItem>
				</>)}
				{(pathname == "/company" && token != "") && (<>
					<NavbarItem>
						<NextUiLink onPress={() => mutateToken!("")} className="cursor-pointer">Logout</NextUiLink>
					</NavbarItem>
				</>)}
				{(pathname == "/user") && (<>
					<NavbarItem>
						<Button onClick={connectWallet} disabled={connected} color="primary" href="#" variant="flat">
							{!connected ? "Connect Wallet 💳" : "Connected ✔"}
						</Button>
					</NavbarItem>
				</>)}
      		</NavbarContent>

			<NavbarMenu>
				{
					links?.map((link, index) => (
						<NavbarMenuItem key={index}>
							<Link color={pathname != link.href ? "foreground" : "primary"} href={link.href}>{link.label}</Link>
						</NavbarMenuItem>
					))
				}
			</NavbarMenu>
    	</NextUINavbar>
		<LoginModal isOpen={isOpenLogin} onOpenChange={onOpenChangeLogin}/>
		<SignUpModal isOpen={isOpenSignup} onOpenChange={onOpenChangeSignup}/>
	</>);
};
