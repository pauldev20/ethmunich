'use client';
import { title } from "@/components/primitives";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Tooltip, useDisclosure} from "@nextui-org/react";
import { ArrowPathIcon, ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState } from "react";
import { BookBillboardModal } from "./bookBilloardModal";
import { useUser } from "@/providers/userProvider";

interface Billboard {
	id: Number;
	type: String;
	lat: Number;
	lng: Number;
	cost_per_block: Number;
}

const columns = [
	{
		key: "type",
		label: "Type",
	},
	{
		key: "location",
		label: "Location",
	},
	{
		key: "cost_per_block",
		label: "Cost Per Block",
	},
	{
		key: "booking",
		label: "",
	}
];

export default function UserPage() {
	const { token, mutateToken } = useUser();
	const [loading, setLoading] = useState(true);
	const {isOpen, onOpen, onOpenChange} = useDisclosure();
	const [billboards, setBillboards] = useState<Billboard[]>([]);
	const [myBillboards, setMyBillboards] = useState<Number[]>([]);
	const [selectedBillboard, setSelectedBillboard] = useState<Number>(0);

	const deleteBillboard = useCallback(async () => {
		setLoading(true);
		await fetch("http://" + process.env.NEXT_PUBLIC_SERVER_HOST + "/blockchain/unstake", {
			method: 'POST',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: ""
		});
		setLoading(false);
	}, []);

	const fetchBillboards = useCallback(async () => {
		setLoading(true);
		const response1 = await fetch("http://" + process.env.NEXT_PUBLIC_SERVER_HOST + "/bill-board");
		const data = await response1.json();
		var newBillboards: Billboard[] = [];
		for (var i in data) {
			if (Number(data[i].info[2].hex) == 0) {
				continue;
			}
			newBillboards.push({
				id: Number(data[i].info[2].hex),
				type: "64x64 Pixels",
				lat: Number(data[i].info[4][0].hex) / 1000000,
				lng: Number(data[i].info[4][1].hex) / 1000000,
				cost_per_block: Number(data[i].info[7].hex),
			});
		}
		console.log(data);
		setBillboards(newBillboards);
		const response2 = await fetch("http://" + process.env.NEXT_PUBLIC_SERVER_HOST + "/company/getRentedByCompany");
		const data2 = await response2.json();
		var myBillboards: Number[] = [];
		for (var i in data2) {
			if (Number(data2[i].info[2].hex) == 0) {
				continue;
			}
			myBillboards.push(Number(data2[i].info[2].hex));
		}
		setMyBillboards(myBillboards);
		setLoading(false);
	}, []);

	useEffect(() => {
		fetchBillboards();
	}, [fetchBillboards]);

	return (<>
		<div>
			<h1 className={title()}>Book Billboard
				<Tooltip content="Refresh Billboards">
					<ArrowPathIcon className={"w-6 h-6 inline ml-3 cursor-pointer"} onClick={fetchBillboards}/>
				</Tooltip>
			</h1>
		</div>
		{(!loading && token != "") && (<div className="my-4 text-left">
			<Table aria-label="Billboard Booking" >
				<TableHeader columns={columns}>
					{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
				</TableHeader>
				<TableBody items={billboards}>
					{(item) => (
						<TableRow key={item.id.toString()}>
							{(columnKey) => {
								if (columnKey == "booking") {
									return (
										<TableCell>
											<div className="relative flex items-center gap-2">
												<Tooltip content="Book">
													<span className="text-lg text-default-400 cursor-pointer active:opacity-50">
														{(!myBillboards.includes(item.id)) && <ShoppingCartIcon className="w-8 h-8" onClick={() => {
															setSelectedBillboard(item.id);
															onOpen();
														}}/>}
														{(myBillboards.includes(item.id)) && <XMarkIcon className="w-8 h-8" onClick={() => {
															deleteBillboard();
															fetchBillboards();
														}}/>}
													</span>
												</Tooltip>
											</div>
										</TableCell>
									)
								}
								if (columnKey == "location") {
									return <TableCell>{item.lat.toString()}, {item.lng.toString()}</TableCell>
								}
								if (columnKey == "cost_per_block") {
									return <TableCell>{item.cost_per_block.toString()} GWEI</TableCell>
								}
								return <TableCell>{getKeyValue(item, columnKey)}</TableCell>
							}}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>)}
		{(loading && token != "") && (<div className="text-warning">Loading...</div>)}
		{(token == "") && (<div className="text-warning">Please log in to see Bilboards to book</div>)}
		<BookBillboardModal isOpen={isOpen} onOpenChange={onOpenChange} selectedBillboard={selectedBillboard} onChange={fetchBillboards}/>
	</>);
}