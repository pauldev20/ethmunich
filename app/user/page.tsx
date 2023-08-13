'use client';
import { title } from "@/components/primitives";
import BillboardCard from "./billboardCard";
import { Tooltip, useDisclosure } from "@nextui-org/react";
import { AddBilboardModal } from "./addBilloardModal";
import { useWallet } from "@/providers/walletProvider";
import { ethers } from "ethers";
import { BLOCK_BOARD_CONTRACT_ADDRESS, BLOCK_BOARD_CONTRACT_ABI, NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI } from "@/config/chain";
import { useCallback, useEffect, useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

interface Billboard {
	id: BigInt;
	earnings: BigInt;
	lat: BigInt;
	lng: BigInt;
}

export default function UserPage() {
	const [loading, setLoading] = useState(true);
	const { connected, signer, wallet } = useWallet();
	const {isOpen, onOpen, onOpenChange} = useDisclosure();
	const [billboards, setBillboards] = useState<Billboard[]>([]);

	const loadBillboards = useCallback(async () => {
		if (connected) {
			setLoading(true);
			const BlockBoardContract = new ethers.Contract(BLOCK_BOARD_CONTRACT_ADDRESS, BLOCK_BOARD_CONTRACT_ABI, signer);
			const NFTContract = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, signer);
			const nftCount = (await NFTContract.balanceOf(wallet)).toBigInt()
			let newBillboards: Billboard[] = [];
			for (let i = 0; i < nftCount; i++) {
				const tokenID = (await NFTContract.tokenOfOwnerByIndex(wallet, i)).toBigInt();
				const blockboard = await BlockBoardContract.billboards_map(tokenID);
				newBillboards.push({
					id: tokenID,
					earnings: (await BlockBoardContract.getRentForBillboard(tokenID)).toBigInt(),
					lat: blockboard.location.lat.toBigInt(),
					lng: blockboard.location.long.toBigInt(),
				});
			}
			setBillboards(newBillboards);
			setLoading(false);
		}
	}, [signer, wallet, connected]);

	useEffect(() => {
		loadBillboards();
	}, [loadBillboards, connected]);

	return (<>
		<div>
			<h1 className={title()}>My Billboards 
				{(connected) && <Tooltip content="Refresh Billboards">
					<ArrowPathIcon className={"w-6 h-6 inline ml-3 cursor-pointer"} onClick={loadBillboards}/>
				</Tooltip>}
			</h1>
		</div>
		{(connected && !loading) && (<div className="flex flex-wrap my-4 gap-4 justify-center">
			{billboards.map((billboard, index) => (
				<BillboardCard key={index} {...billboard}/>
			))}
			<BillboardCard add onPress={onOpen}/>
		</div>)}
		{(!connected) && (<div className="text-warning">
			Please connect your wallet to view your Billboards
		</div>)}
		{(connected && loading) && (<div className="text-warning">Loading...</div>)}
		<AddBilboardModal isOpen={isOpen} onOpenChange={onOpenChange}/>
	</>);
}