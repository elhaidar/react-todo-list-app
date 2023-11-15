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
  Icon,
  HStack,
  Text,
} from "@chakra-ui/react";
//import type untuk useDispatch
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { AppDispatch } from "../../../../../../../redux/store";
//import styling
import {
  backgroundContainerCardColor,
  textColor,
} from "../../../../../../../component/style";
//import reducer action dari todoSlice redux
import { restoreTodo } from "../../../../../../../redux/slices/todoSlice";
import { MdRestore } from "react-icons/md";

//props isOpen untuk menampilkan modal component
//props onClose untuk menutup modal component
//props id untuk menerima data id todo item
const AlertDialogRestore = ({
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
        <AlertDialogHeader>
          <HStack>
            <Text>Restore Item</Text>
            <Icon as={MdRestore} />
          </HStack>
        </AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Are you sure want to restore this item?
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
                title: `Todo item restored!`,
                status: "success",
                position: "top-right",
                isClosable: true,
              });
              dispatch(restoreTodo({ id }));
            }}
          >
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogRestore;
