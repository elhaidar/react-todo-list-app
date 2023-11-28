/* eslint-disable @typescript-eslint/no-explicit-any */

//import library UI
import { Stack, useDisclosure } from "@chakra-ui/react";

//import styling
import { backgroundContainerColor } from "../style";

//import Sidebar Content component
import SidebarContent from "./section/SidebarContent";

//import MobileNav component
import MobileNav from "./section/MobileNav";

export default function Sidebar() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Stack
      position={"sticky"}
      top={0}
      zIndex={10}
      h={"100%"}
      bg={backgroundContainerColor()}
      py={{ base: 4, lg: 0 }}
      w={"auto"}
    >
      <SidebarContent
        pt={"16px"}
        onClose={() => onClose}
        display={{ base: "none", lg: "block" }}
      />
      <MobileNav isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </Stack>
  );
}
