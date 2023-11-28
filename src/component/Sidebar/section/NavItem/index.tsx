//import library UI
import { Flex, Text, Icon, Menu, MenuButton, Box } from "@chakra-ui/react";

//import data type
import { IconType } from "react-icons";

//import styling
import { primaryColor } from "../../../style";

//import Link react-router
import { Link } from "react-router-dom";

export default function NavItem({
  icon,
  title,
  active,
  navSize,
  href,
  onClose,
}: {
  icon: IconType;
  title: string;
  active?: boolean;
  navSize: string;
  href: string;
  onClose: () => void;
}) {
  return (
    <Flex mt={30} flexDir="column" w="100%" alignItems={"flex-start"}>
      <Menu placement="right">
        <Box
          backgroundColor={active ? primaryColor() : "transparent"}
          color={active ? "white" : "gray.500"}
          borderRadius={8}
          _hover={{
            textDecor: "none",
            color: "white",
            backgroundColor: primaryColor(),
          }}
          w={navSize === "small" ? "auto" : "100%"}
        >
          <Link
            to={href}
            style={{ width: "100%", height: "100%" }}
            onClick={onClose}
          >
            <MenuButton w="100%" h={"100%"} p={3}>
              <Flex>
                <Icon as={icon} fontSize="xl" />
                <Text ml={5} display={navSize == "small" ? "none" : "flex"}>
                  {title}
                </Text>
              </Flex>
            </MenuButton>
          </Link>
        </Box>
      </Menu>
    </Flex>
  );
}
