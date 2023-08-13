'use client';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Input, Link} from "@nextui-org/react";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUser } from "@/providers/userProvider";

type Inputs = {
  username: string
  password: string
}

export interface LoginModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

export function LoginModal({isOpen, onOpenChange}: LoginModalProps) {
  const {mutateToken} = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await fetch("http://" + process.env.NEXT_PUBLIC_SERVER_HOST + "/auth/login", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: data.username, password: data.password})
    });
    if (mutateToken) {
      mutateToken((await response.json()).result.token);
    }
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1">Login</ModalHeader>
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
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                Login
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
