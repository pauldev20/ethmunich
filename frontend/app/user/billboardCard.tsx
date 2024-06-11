import {Card, CardHeader, CardBody, Image, Skeleton} from "@nextui-org/react";
import { PlusIcon } from '@heroicons/react/24/solid'
import flip from "./flip.module.css"
import { useState } from "react";
import { ethers } from "ethers";

export interface BillboardCardProps {
	id?: BigInt;
	earnings?: BigInt;
	lat?: BigInt;
	lng?: BigInt;
	add?: boolean;
	onPress?: () => void;
}

export default function BillboardCard({id, earnings, lat, lng, add, onPress}: BillboardCardProps) {
	const [imgIsLoading, setImgIsLoading] = useState(true);

	if (add) {
		return (
			<div className="flex items-center justify-center rounded-large py-4 w-[300px] h-[340px] cursor-pointer border-dashed border-2 bg-gray-50 border-gray-200 dark:bg-opacity-10 dark:border-opacity-10" onClick={onPress}>
				<PlusIcon className="w-8 h-8 text-gray-400"/>
			</div>
		)
	}

	const earningsETH = earnings ? ethers.utils.formatEther(Number(earnings)).toString() : "0";
	const latitude = lat ? (Number(lat) / 1000000).toString() : "0";
	const longitude = lng ? (Number(lng) / 1000000).toString() : "0";

	return (
		<div className="group perspective w-[300px] h-[340px]">
			<div className="!relative preserve-3d group-hover:my-rotate-y-180 !duration-1000 w-full h-auto">
				<div className="!absolute !backface-hidden">
					<Card className="py-4 w-[300px] h-[340px]">
						<CardHeader className="overflow-visible py-2">
							<Image
								isLoading={imgIsLoading}
								onLoad={() => setImgIsLoading(false)}
								alt="Billboard Image"
								className="object-cover rounded-xl"
								src="/ledpanel.png"
								width={270}
							/>
						</CardHeader>
						<CardBody className="pb-0 pt-2 px-4 flex-col items-start">
							<p className="text-tiny uppercase font-bold">Small Billboard</p>
							<small className="text-default-500">64x64 Pixels</small>
							<h4 className="font-bold text-medium">ID: <p className="inline font-normal italic">{id?.toString()}</p></h4>
						</CardBody>
					</Card>
				</div>
				<div className="!absolute my-rotate-y-180 !backface-hidden">
					<Card className="py-4 w-[300px] h-[340px]">
						<CardBody className="pb-0 pt-2 px-4 flex-col justify-between">
							<h2 className="text-4xl uppercase font-bold">{earningsETH} ETH<span className="block -mt-2 text-tiny text-default-500 font-normal normal-case">Earnings</span></h2>
							<h2 className="text-medium font-bold">Location<span className="block text-tiny text-default-500 font-normal normal-case">{latitude}, {longitude}</span></h2>
						</CardBody>
					</Card>
				</div>
			</div>
		</div>
	)
}