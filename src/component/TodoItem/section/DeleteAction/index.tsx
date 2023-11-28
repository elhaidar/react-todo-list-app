//import icon
import { DeleteIcon } from "@chakra-ui/icons";

//import library UI
import { Stack, useDisclosure } from "@chakra-ui/react";

//import styling
import {
  buttonIconColor,
  buttonIconCompletedColor,
  buttonIconCompletedHoverStyle,
  buttonIconHoverStyle,
} from "../../../style";

//import alert dialog modal component
import AlertDialogDelete from "../../../AlertDialogDelete";

//import data type
import { todoType } from "../../../../type";

//props id for receive data id todoItem
const DeleteAction = ({
  todo,
  size,
  color,
}: {
  todo: todoType;
  size?: string;
  color?: string;
}) => {
  //state/function to control modal component from chakraui
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Stack>
      <DeleteIcon
        w={size ? size : "28px"}
        h={size ? size : "28px"}
        cursor={"pointer"}
        color={
          todo.completed
            ? color
              ? color
              : buttonIconCompletedColor()
            : buttonIconColor()
        }
        _hover={
          todo.completed
            ? buttonIconCompletedHoverStyle()
            : buttonIconHoverStyle(todo.priority)
        }
        onClick={onOpen}
      />
      <AlertDialogDelete isOpen={isOpen} onClose={onClose} id={todo.id} />
    </Stack>
  );
};

export default DeleteAction;
