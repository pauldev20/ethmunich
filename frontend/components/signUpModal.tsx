import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Input, Link} from "@nextui-org/react";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  username: string
  password: string
  confirm_password: string
}

export interface SignUpModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

export function SignUpModal({isOpen, onOpenChange}: SignUpModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => alert(JSON.stringify(data));

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Sign Up</ModalHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <Input
                autoFocus
                endContent={
                  <EnvelopeIcon className="w-8 h-8"/>
                }
                label="Username"
                placeholder="Enter your username"
                variant="bordered"
                errorMessage={errors.username?.message}
                {...register("username", {required: true})}
              />
              <Input
                endContent={
                  <LockClosedIcon className="w-8 h-8"/>
                }
                label="Password"
                placeholder="Enter your password"
                type="password"
                variant="bordered"
                errorMessage={errors.password?.message}
                {...register("password", {required: true})}
              />
              <Input
                endContent={
                  <LockClosedIcon className="w-8 h-8"/>
                }
                label="Password Repeat"
                placeholder="Repeat your password"
                type="password"
                variant="bordered"
                errorMessage={errors.confirm_password?.message}
                {...register("confirm_password", {
                  required: true,
                  validate: (value) => value === watch("password") || "The passwords do not match"
                })}
                />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                Sign Up
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
