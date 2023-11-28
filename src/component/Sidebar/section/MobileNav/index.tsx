//import library UI
import { Drawer, DrawerContent, IconButton } from "@chakra-ui/react";

//import Sidebar Content
import SidebarContent from "../SidebarContent";

//import icon
import { FiMenu } from "react-icons/fi";

//import styling
import { textColor } from "../../../style";

//import react hooks
import { useEffect } from "react";

//import useScreenSize custom hooks
import useScreenSize from "../../../../hooks/useScreenSize";

const MobileNav = ({
  onOpen,
  onClose,
  isOpen,
}: {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}) => {
  const screenSize = useScreenSize();

  //check lg screen width size to close the drawer
  useEffect(() => {
    if (screenSize.width > 992) {
      onClose();
    }
  }, [screenSize.width]);

  return (
    <>
      <IconButton
        display={{ base: "block", lg: "none" }}
        aria-label="hamburger-button"
        background="none"
        color={"gray.500"}
        _hover={{ background: "none", color: textColor() }}
        icon={<FiMenu />}
        onClick={onOpen}
        w={"min-content"}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} px={"32px"} pt={"24px"} />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileNav;
