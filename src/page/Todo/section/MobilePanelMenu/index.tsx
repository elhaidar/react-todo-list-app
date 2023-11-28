//import library UI
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tab,
} from "@chakra-ui/react";

//import styling
import {
  backgroundContainerCardColor,
  primaryColor,
  primaryHoverStyle,
} from "../../../../component/style";

//import icon
import { ChevronDownIcon } from "@chakra-ui/icons";

//import react hooks
import { useState } from "react";

//import searchParams data type
import { SetURLSearchParams } from "react-router-dom";

const MobilePanelMenu = ({
  setFilterParams,
  displayParams,
}: {
  setFilterParams: SetURLSearchParams;
  displayParams: string | null;
}) => {
  const [selectedPanel, setSelectedPanel] = useState(displayParams || "all");

  const handeMenuOnClick = (panel: string) => {
    setSelectedPanel(panel);
    setFilterParams((prev) => {
      prev.set("filter", panel);
      return prev;
    });
  };

  return (
    <Menu isLazy>
      <MenuButton
        as={Button}
        py={2}
        rounded={"full"}
        px={4}
        bg={primaryColor()}
        color={"gray.50"}
        rightIcon={<ChevronDownIcon />}
        _hover={{ bg: primaryColor() }}
        _active={{ bg: primaryColor() }}
        fontSize={{ base: "sm", md: "md" }}
      >
        {selectedPanel.charAt(0).toUpperCase() + selectedPanel.slice(1)}
      </MenuButton>
      <MenuList bg={backgroundContainerCardColor()}>
        <Tab
          _selected={primaryHoverStyle()}
          _hover={primaryHoverStyle()}
          as={MenuItem}
          onClick={() => handeMenuOnClick("all")}
          w={"100%"}
          rounded={"none"}
          bg={"transparent"}
          fontSize={{ base: "sm", md: "md" }}
        >
          All
        </Tab>
        <Tab
          _hover={primaryHoverStyle()}
          _selected={primaryHoverStyle()}
          as={MenuItem}
          onClick={() => handeMenuOnClick("completed")}
          w={"100%"}
          rounded={"none"}
          bg={"transparent"}
          fontSize={{ base: "sm", md: "md" }}
        >
          Completed
        </Tab>
        <Tab
          _hover={primaryHoverStyle()}
          _selected={primaryHoverStyle()}
          as={MenuItem}
          onClick={() => handeMenuOnClick("ongoing")}
          w={"100%"}
          rounded={"none"}
          bg={"transparent"}
          fontSize={{ base: "sm", md: "md" }}
        >
          Ongoing
        </Tab>
      </MenuList>
    </Menu>
  );
};

export default MobilePanelMenu;
