import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Input, Link} from "@nextui-org/react";
import { GlobeAmericasIcon } from "@heroicons/react/24/outline";
import { useForm, SubmitHandler } from "react-hook-form";
import { useWallet } from "@/providers/walletProvider";
import { ethers } from "ethers";
import { BLOCK_BOARD_CONTRACT_ADDRESS, BLOCK_BOARD_CONTRACT_ABI } from "@/config/chain";

export interface AddBilboardModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

type Inputs = {
	lat: string
	lng: string
}

export function AddBilboardModal({isOpen, onOpenChange}: AddBilboardModalProps) {
	const { connected, signer, wallet } = useWallet();
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		const BlockBoardContract = new ethers.Contract(BLOCK_BOARD_CONTRACT_ADDRESS, BLOCK_BOARD_CONTRACT_ABI, signer);
		await BlockBoardContract.registerBillboard(Number(data.lng) * 1000000, Number(data.lat) * 1000000);
		onOpenChange(false);
	};

	return (
		<>
		<Modal
			isOpen={isOpen} 
			onOpenChange={onOpenChange}
			placement="center"
			backdrop="blur"
		>
			<ModalContent>
			{(onClose) => (
				<form onSubmit={handleSubmit(onSubmit)}>
					<ModalHeader className="flex flex-col gap-1">Add New Billboard<p className="-mt-1 text-small">Creating a new Billboard takes time, refresh your Billboards after a few seconds</p></ModalHeader>
					<ModalBody>
						<Input
							endContent={
								<GlobeAmericasIcon className="w-8 h-8"/>
							}
							label="Longitude"
							variant="bordered"
							errorMessage={errors.lng?.message}
							{...register("lng", {
								required: true,
								validate: (value) => {
									if (RegExp("^(\\+|-)?(?:180(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]{1,6})?))$").test(value)) {
										return true
									}
									return "Please enter a valid longitude"
								}
							})}
						/>
						<Input
							endContent={
								<GlobeAmericasIcon className="w-8 h-8"/>
							}
							label="Latitude"
							variant="bordered"
							errorMessage={errors.lat?.message}
							{...register("lat", {
								required: true,
								validate: (value) => {
									if (RegExp("^(\\+|-)?(?:90(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\\.[0-9]{1,6})?))$").test(value)) {
										return true
									}
									return "Please enter a valid latitude"
								}
							})}

						/>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" type="submit">
						Add
						</Button>
					</ModalFooter>
				</form>
			)}
			</ModalContent>
		</Modal>
		</>
	);
}
