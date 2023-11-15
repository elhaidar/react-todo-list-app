/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogBody,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
//import styling
import {
  cardBackgroundColor,
  textColor,
} from "../../../../../../component/style";
import { useRef } from "react";

const AlertDialogConfirmation = ({
  isOpen,
  onClose,
  setIsAddImport,
  setIsConfirmed,
}: {
  isOpen: boolean;
  onClose: () => void;
  setIsAddImport: React.Dispatch<React.SetStateAction<boolean>>;
  setIsConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
        bg={cardBackgroundColor()}
        color={textColor()}
      >
        <AlertDialogHeader>Import File</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody minH={"100px"}>
          Are you sure you want to add the imported todo?
        </AlertDialogBody>
        <AlertDialogFooter gap={2}>
          <Button
            colorScheme="red"
            onClick={() => {
              setIsConfirmed(true);
              setIsAddImport(false);
              onClose();
            }}
            rounded={"3xl"}
            px={6}
          >
            Replace it
          </Button>
          <Button
            colorScheme="purple"
            rounded={"3xl"}
            px={6}
            onClick={() => {
              setIsConfirmed(true);
              setIsAddImport(true);
              onClose();
            }}
          >
            Yes, add it
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogConfirmation;
