import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BsSortDown } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../../../../redux/store";
//import action reducer from redux
import { setSort } from "../../../../../redux/slices/todoSlice";
//import styling
import {
  backgroundContainerColor,
  buttonMonoHoverStyle,
  iconButtonActionHoverStyle,
  primaryColor,
  scrollBarStyleSx,
  textColor,
} from "../../../../../component/style";
//import data list sort parameter
import { listSort } from "../../../../../util/data";
import _ from "lodash";
import { useRef } from "react";

const SortAction = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { sort } = useAppSelector((state) => state.todo);
  const selectedOptionItem = useRef<HTMLElement | null>(null);

  //handle onChange sort option
  const handleOnChange = (value: string | string[], key: string) => {
    if (typeof value === "string") {
      dispatch(setSort({ ...sort, [key]: value }));
    }
  };

  //handle scroll to selected option when menu opened
  const handleMenuOpen = () => {
    if (selectedOptionItem.current) {
      const selectedMenuItem = selectedOptionItem.current as HTMLElement;

      selectedMenuItem.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  return (
    <Menu closeOnSelect={false} onOpen={handleMenuOpen}>
      <Stack>
        <MenuButton
          as={IconButton}
          aria-label="filter-button"
          icon={<BsSortDown />}
          color={
            sort && _.isEqual(sort, { order: "", sortBy: "" })
              ? textColor()
              : "gray.50"
          }
          cursor={"pointer"}
          border={"1px"}
          borderColor={
            sort && _.isEqual(sort, { order: "", sortBy: "" })
              ? "gray.600"
              : primaryColor()
          }
          bg={
            sort && _.isEqual(sort, { order: "", sortBy: "" })
              ? "transparent"
              : primaryColor()
          }
          _hover={iconButtonActionHoverStyle()}
          _active={iconButtonActionHoverStyle()}
        >
          <Text as={"span"} w={"100%"} textAlign={"left"} display={"flex"}>
            Sort
          </Text>
        </MenuButton>
      </Stack>
      <MenuList
        color={textColor()}
        borderColor={primaryColor()}
        bg={backgroundContainerColor()}
      >
        {sort && (
          <Stack>
            <MenuOptionGroup
              defaultValue={sort.order}
              title="Order"
              type="radio"
              onChange={(value) => handleOnChange(value, "order")}
              fontWeight={"300"}
            >
              <MenuItemOption
                value="asc"
                bg={"transparent"}
                _hover={buttonMonoHoverStyle()}
                fontWeight={"300"}
              >
                Ascending
              </MenuItemOption>
              <MenuItemOption
                value="desc"
                bg={"transparent"}
                _hover={buttonMonoHoverStyle()}
                fontWeight={"300"}
              >
                Descending
              </MenuItemOption>
            </MenuOptionGroup>
            <MenuDivider borderColor={primaryColor()} />

            <Stack overflowY={"auto"} maxH={"150px"} sx={scrollBarStyleSx()}>
              <MenuOptionGroup
                title="Sort by"
                type="radio"
                defaultValue={sort.sortBy}
                onChange={(value) => handleOnChange(value, "sortBy")}
                fontWeight={"300"}
              >
                {listSort.map((item) => (
                  <MenuItemOption
                    key={item.value}
                    value={item.value}
                    bg={"transparent"}
                    _hover={buttonMonoHoverStyle()}
                    fontWeight={"300"}
                    ref={(el) => {
                      if (item.value === sort.sortBy) {
                        selectedOptionItem.current = el;
                      }
                    }}
                  >
                    {item.label}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </Stack>
          </Stack>
        )}
      </MenuList>
    </Menu>
  );
};

export default SortAction;
