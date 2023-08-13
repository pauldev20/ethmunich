'use client';
import { ethers } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";

declare global {
	interface Window {
	  ethereum?: ethers.providers.ExternalProvider;
	}
}

/* --------------------------------- Context -------------------------------- */

export interface IWalletContext {
	wallet?: string;
	connected?: boolean;
	signer?: ethers.Signer;
	connectWallet?: () => void;
}

export const WalletContext = createContext<IWalletContext>({});

/* ---------------------------------- Hook ---------------------------------- */

export function useWallet() {
	return useContext(WalletContext);
}

/* -------------------------------- Provider -------------------------------- */
export function WalletProvider({children}: {children: React.ReactNode;}) {
	const [wallet, setWallet] = useState("");
	const [connected, setConnected] = useState(false);
	const [signer, setSigner] = useState<ethers.Signer | undefined>(undefined);

	const connectWallet = async () => {
		if (window.ethereum) {
			const provider = new ethers.providers.Web3Provider(window.ethereum!);
			const walletAddress = (await provider.send("eth_requestAccounts", []))[0];
			const signer = provider.getSigner(walletAddress);
			setWallet(walletAddress);
			setSigner(signer);
			setConnected(true);
		}
	};

	return (
		<WalletContext.Provider value={{wallet, connected, signer, connectWallet}}>
			{children}
		</WalletContext.Provider>
	)
}
