/* eslint-disable @typescript-eslint/no-explicit-any */
//import library UI
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
  Text,
} from "@chakra-ui/react";

//import dispatch
import { useDispatch } from "react-redux";

//import type for useDispatch
import { AppDispatch } from "../../../../../../redux/store";

//import react hooks
import { useRef } from "react";

//import styling
import {
  backgroundContainerCardColor,
  dangerColor,
  textColor,
} from "../../../../../../component/style";

//import action reducer from todoSlice redux
import { deleteTodoPermanently } from "../../../../../../redux/slices/todoSlice";

//props isOpen for showing modal component
//props onClose for close modal component
//props id for receive data id todo item
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
        w={{ base: "85%", sm: "auto" }}
      >
        <AlertDialogHeader>Delete Todo Permanently</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Are you sure want to delete this todo{" "}
          <Text as={"span"} color={dangerColor()}>
            permanently
          </Text>
          ?
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
                title: `Todo deleted`,
                status: "error",
                position: "top-right",
                isClosable: true,
              });
              dispatch(deleteTodoPermanently({ id }));
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
