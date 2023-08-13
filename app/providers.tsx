"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { UserProvider } from "@/providers/userProvider";
import { WalletProvider } from "@/providers/walletProvider";


export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
	return (
		<UserProvider>
			<WalletProvider>
				<NextUIProvider>
					<NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
				</NextUIProvider>
			</WalletProvider>
		</UserProvider>
	);
}
