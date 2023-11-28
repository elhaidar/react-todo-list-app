//import library UI
import {
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";

//import icon
import { HiOutlineDotsHorizontal, HiOutlineDotsVertical } from "react-icons/hi";
import { MdRestore } from "react-icons/md";
import { DeleteIcon } from "@chakra-ui/icons";

//import data type
import { todoType } from "../../../../../../type";

//import styling
import {
  backgroundContainerColor,
  primaryHoverStyle,
  textColor,
} from "../../../../../../component/style";

//import alert dialog component
import AlertDialogDelete from "../AlertDialogDelete";
import AlertDialogRestore from "../AlertDialogRestore";

const ActionButtonThreeDots = ({
  todoItem,
  isVertical = false,
}: {
  todoItem: todoType;
  isVertical?: boolean;
}) => {
  const {
    isOpen: isRestoreConfirmationOpen,
    onOpen: onRestoreConfirmationOpen,
    onClose: onRestoreConfirmationClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteConfirmationOpen,
    onOpen: onDeleteConfirmationOpen,
    onClose: onDeleteConfirmationClose,
  } = useDisclosure();

  return (
    <>
      <Menu>
        <MenuButton as={Stack} cursor={"pointer"}>
          <Icon
            as={isVertical ? HiOutlineDotsVertical : HiOutlineDotsHorizontal}
            color={textColor()}
            p={0}
          />
        </MenuButton>
        <MenuList
          bg={backgroundContainerColor()}
          border={"none"}
          boxShadow={"lg"}
          fontSize={"sm"}
        >
          <MenuItem
            icon={<MdRestore />}
            bg={"transparent"}
            _hover={primaryHoverStyle()}
            onClick={onRestoreConfirmationOpen}
          >
            Restore
          </MenuItem>
          <MenuItem
            icon={<DeleteIcon />}
            bg={"transparent"}
            _hover={primaryHoverStyle()}
            onClick={onDeleteConfirmationOpen}
          >
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
      <AlertDialogRestore
        isOpen={isRestoreConfirmationOpen}
        onClose={onRestoreConfirmationClose}
        id={todoItem.id}
      />
      <AlertDialogDelete
        isOpen={isDeleteConfirmationOpen}
        onClose={onDeleteConfirmationClose}
        id={todoItem.id}
      />
    </>
  );
};

export default ActionButtonThreeDots;
