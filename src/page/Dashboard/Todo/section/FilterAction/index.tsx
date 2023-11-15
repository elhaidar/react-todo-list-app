import { IconButton, useDisclosure } from "@chakra-ui/react";
import ModalFilter from "./fragment/ModalFilter";
import { HiFilter } from "react-icons/hi";
//import styling
import {
  iconButtonActionHoverStyle,
  primaryColor,
  textColor,
} from "../../../../../component/style";
import { useAppSelector } from "../../../../../redux/store";
import { initialFilterState } from "../../../../../util/data";
import _ from "lodash";

const FilterAction = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { filter } = useAppSelector((state) => state.todo);

  return (
    <>
      <IconButton
        aria-label="filter-button"
        icon={<HiFilter />}
        color={
          filter && _.isEqual(filter, initialFilterState)
            ? textColor()
            : "gray.50"
        }
        cursor={"pointer"}
        border={"1px"}
        borderColor={
          filter && _.isEqual(filter, initialFilterState)
            ? "gray.600"
            : primaryColor()
        }
        bg={
          filter && _.isEqual(filter, initialFilterState)
            ? "transparent"
            : primaryColor()
        }
        _hover={iconButtonActionHoverStyle()}
        onClick={onOpen}
      />
      <ModalFilter isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default FilterAction;
