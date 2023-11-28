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
  Icon,
  HStack,
  Text,
} from "@chakra-ui/react";

//import type for useDispatch
import { AppDispatch } from "../../../../../../redux/store";

//import dispatch redux
import { useDispatch } from "react-redux";

//import react hooks
import { useRef } from "react";

//import styling
import {
  backgroundContainerCardColor,
  textColor,
} from "../../../../../../component/style";

//import action reducer from todoSlice redux
import { restoreTodo } from "../../../../../../redux/slices/todoSlice";

//import icon
import { MdRestore } from "react-icons/md";

//props isOpen for show modal component
//props onClose for close modal component
//props id for receive data id todo item
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
        w={{ base: "85%", sm: "auto" }}
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
