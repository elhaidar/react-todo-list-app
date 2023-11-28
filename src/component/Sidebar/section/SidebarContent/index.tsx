//import library UI
import {
  CloseButton,
  Divider,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Switch,
} from "@chakra-ui/react";

//import styling
import { backgroundContainerColor, textColor } from "../../../style";

//import data navItem
import { navLinks } from "../../../../util/data";

//import NavItem component
import NavItem from "../NavItem";

//import icon
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FiMenu } from "react-icons/fi";

//import react hooks
import { useContext, useState } from "react";

//import react-router hooks
import { useLocation } from "react-router-dom";

//import Theme Context
import { ThemeContext } from "../../../../App";

interface SidebarContentProps extends FlexProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarContentProps) => {
  const [navSize, changeNavSize] = useState<string>("large");
  const theme: any = useContext(ThemeContext);
  const location = useLocation();

  return (
    <Flex
      h="100%"
      minW={navSize == "small" ? "100px" : "200px"}
      flexDir="column"
      bg={backgroundContainerColor()}
      color={textColor()}
      {...rest}
    >
      <Flex
        flexDir="column"
        w="100%"
        h={"100%"}
        alignItems={"flex-start"}
        as="nav"
      >
        <CloseButton display={{ base: "flex", lg: "none" }} onClick={onClose} />
        <IconButton
          display={{ base: "none", lg: "block" }}
          aria-label="hamburger-button"
          background="none"
          p={3}
          color={"gray.500"}
          _hover={{ background: "none", color: textColor() }}
          icon={<FiMenu />}
          onClick={() => {
            if (navSize == "small") changeNavSize("large");
            else changeNavSize("small");
          }}
        />
        {navLinks.map((nav) => (
          <NavItem
            key={nav.title}
            navSize={navSize}
            icon={nav.icon}
            title={nav.title}
            href={nav.href}
            active={location.pathname === nav.href ? true : false}
            onClose={onClose}
          />
        ))}
        <Divider mt={8} borderColor={"gray.500"} />
        <Flex
          p="3"
          flexDir="column"
          w="100%"
          alignItems={"flex-start"}
          mt={{ base: 2, lg: 4 }}
        >
          <HStack align="center">
            {theme.currentTheme ? <MoonIcon /> : <SunIcon />}
            <Switch
              ml={2}
              size={"lg"}
              isChecked={theme.currentTheme}
              onChange={theme.switchTheme}
              colorScheme={"purple"}
              name="theme"
            />
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SidebarContent;
