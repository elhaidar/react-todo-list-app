import { Icon, Menu, MenuButton, MenuList, Stack } from "@chakra-ui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
//import action button component
import EditAction from "./fragment/EditAction";
import DeleteAction from "./fragment/DeleteAction";
//import styling
import {
  backgroundContainerColor,
  buttonIconCompletedColor,
  textColor,
} from "../../../../../../../../../component/style";
import { todoType } from "../../../../../../../../../type";

const ActionButtonThreeDots = ({ todoItem }: { todoItem: todoType }) => {
  return (
    <Menu>
      <MenuButton as={Stack} cursor={"pointer"}>
        <Icon
          as={HiOutlineDotsHorizontal}
          color={todoItem.completed ? buttonIconCompletedColor() : textColor()}
          p={0}
        />
      </MenuButton>
      <MenuList
        bg={backgroundContainerColor()}
        border={"none"}
        boxShadow={"lg"}
        fontSize={"sm"}
      >
        <EditAction id={todoItem.id} />
        <DeleteAction id={todoItem.id} />
      </MenuList>
    </Menu>
  );
};

export default ActionButtonThreeDots;
