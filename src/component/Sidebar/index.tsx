/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import { Divider, Flex, HStack, IconButton, Switch } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
//import NavItem component
import NavItem from "./section/NavItem";
import { textColor } from "../style";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "../../App";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { navLinks } from "../../util/data";

export default function Sidebar() {
  const [navSize, changeNavSize] = useState<string>("large");
  const theme: any = useContext(ThemeContext);
  const location = useLocation();

  return (
    <Flex
      position={"sticky"}
      top={0}
      h="100%"
      marginTop="2.5vh"
      borderRadius={navSize == "small" ? "15px" : "30px"}
      minW={navSize == "small" ? "100px" : "200px"}
      flexDir="column"
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        h={"100%"}
        alignItems={"flex-start"}
        as="nav"
      >
        <IconButton
          aria-label="hamburger-button"
          background="none"
          mt={5}
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
          />
        ))}

        <Divider mt={8} borderColor={"gray.500"} />
      </Flex>
      <Flex p="5%" flexDir="column" w="100%" alignItems={"flex-start"} mb={4}>
        <HStack align="center" p={"12px"}>
          {theme.currentTheme ? <MoonIcon /> : <SunIcon />}

          <Switch
            size={"lg"}
            isChecked={theme.currentTheme}
            onChange={theme.switchTheme}
            colorScheme={"purple"}
            id="theme"
          ></Switch>
        </HStack>
      </Flex>
    </Flex>
  );
}
