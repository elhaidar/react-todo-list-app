//import icon
import { DeleteIcon } from "@chakra-ui/icons";

//import library UI
import { MenuItem, useDisclosure } from "@chakra-ui/react";

//import styling
import { primaryHoverStyle } from "../../../../../../../../../../component/style";

//import alert dialog delete confirmation
import AlertDialogDelete from "../../../../../../../../../../component/AlertDialogDelete";

const DeleteAction = ({ id }: { id: string }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <MenuItem
        icon={<DeleteIcon />}
        bg={"transparent"}
        _hover={primaryHoverStyle()}
        onClick={onOpen}
      >
        Delete
      </MenuItem>
      <AlertDialogDelete isOpen={isOpen} onClose={onClose} id={id} />
    </>
  );
};

export default DeleteAction;
