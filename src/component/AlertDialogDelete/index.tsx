/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useToast,
  AlertDialogBody,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useRef } from "react";
//import type untuk useDispatch
import { AppDispatch } from "../../redux/store";
//import styling
import { backgroundContainerCardColor, textColor } from "../style";
//import reducer action dari todoSlice redux
import { removeFromTodo } from "../../redux/slices/todoSlice";

//props isOpen for display modal component
//props onClose for close modal component
//props id to receive data id todo item
const AlertDialogDelete = ({
  isOpen,
  onClose,
  id,
}: {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const cancelRef = useRef<any>();

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent
        rounded={"3xl"}
        p={4}
        bg={backgroundContainerCardColor()}
        color={textColor()}
      >
        <AlertDialogHeader>Move to Trash?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Are you sure want to move this todo to trash?
        </AlertDialogBody>
        <AlertDialogFooter gap={2}>
          <Button
            colorScheme="red"
            onClick={onClose}
            ref={cancelRef}
            rounded={"3xl"}
            px={6}
          >
            No
          </Button>
          <Button
            colorScheme="purple"
            rounded={"3xl"}
            px={6}
            onClick={() => {
              toast({
                title: `Todo moved to trash`,
                status: "error",
                position: "top-right",
                isClosable: true,
              });
              dispatch(removeFromTodo({ id }));
            }}
          >
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogDelete;
