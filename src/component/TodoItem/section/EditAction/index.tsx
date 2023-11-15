/* eslint-disable @typescript-eslint/no-unused-vars */
import { EditIcon } from "@chakra-ui/icons";
import { Stack, useDisclosure } from "@chakra-ui/react";
//import data type
import { todoType } from "../../../../type";
//import styling
import {
  buttonIconColor,
  buttonIconCompletedColor,
  buttonIconCompletedHoverStyle,
  buttonIconHoverStyle,
} from "../../../style";
//import custom modal form component
import CustomForm from "../../../Form";

//props data for receive passed todo data
const EditAction = ({
  data,
  size,
  color,
}: {
  data: todoType;
  size?: string;
  color?: string;
}) => {
  //state/hook for controlling modal component
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack>
      <EditIcon
        w={size ? size : "28px"}
        h={size ? size : "28px"}
        cursor={"pointer"}
        color={
          data.completed
            ? color
              ? color
              : buttonIconCompletedColor()
            : buttonIconColor()
        }
        _hover={
          data.completed
            ? buttonIconCompletedHoverStyle()
            : buttonIconHoverStyle(data.priority)
        }
        onClick={onOpen}
      />
      <CustomForm
        title="Edit Todo"
        isOpen={isOpen}
        onClose={onClose}
        id={data.id}
      />
    </Stack>
  );
};

export default EditAction;
