import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Input, Link} from "@nextui-org/react";
import { GlobeAmericasIcon } from "@heroicons/react/24/outline";
import { useForm, SubmitHandler } from "react-hook-form";
import { useWallet } from "@/providers/walletProvider";

export interface BookBillboardModalProps {
	isOpen: boolean;
	selectedBillboard: Number;
	onOpenChange: (open: boolean) => void;
	onChange: () => void;
}

type Inputs = {
	url: string
	cost_per_block: string
}

export function BookBillboardModal({isOpen, selectedBillboard, onOpenChange, onChange}: BookBillboardModalProps) {
	const { connected, signer, wallet } = useWallet();
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		console.log({ad_url: data.url, billboard_token_id: selectedBillboard, cost_per_block: Number(data.cost_per_block)})
		await fetch("http://" + process.env.NEXT_PUBLIC_SERVER_HOST + "/blockchain/rentbillboard", {
			method: 'POST',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({ad_url: data.url, billboard_token_id: selectedBillboard, cost_per_block: Number(data.cost_per_block)})
		});
		onOpenChange(false);
		onChange();
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
							label="URL"
							variant="bordered"
							errorMessage={errors.url?.message}
							{...register("url", {
								required: true,
								validate: (value) => {
									if (RegExp(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/).test(value)) {
										return true
									}
									return "Please enter a valid URL"
								}
							})}
						/>
						<Input
							endContent={
								"GWEI"
							}
							label="Cost Per Block"
							variant="bordered"
							errorMessage={errors.cost_per_block?.message}
							{...register("cost_per_block", {
								required: true,
								validate: (value) => {
									if (RegExp(/^\d+$/).test(value)) {
										return true
									}
									return "Please enter a valid GWEI"
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
