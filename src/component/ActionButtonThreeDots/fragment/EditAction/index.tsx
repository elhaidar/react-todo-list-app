import { EditIcon } from "@chakra-ui/icons";
import { MenuItem, useDisclosure } from "@chakra-ui/react";
//import styling
import { primaryHoverStyle } from "../../../style";
//import custom form component
import CustomForm from "../../../Form";

const EditAction = ({ id }: { id: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <MenuItem
        icon={<EditIcon />}
        bg={"transparent"}
        _hover={primaryHoverStyle()}
        onClick={onOpen}
      >
        Edit
      </MenuItem>
      <CustomForm title="Edit Todo" isOpen={isOpen} onClose={onClose} id={id} />
    </>
  );
};

export default EditAction;
