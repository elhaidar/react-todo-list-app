//import library UI
import { Container } from "@chakra-ui/react";

//import styling
import { backgroundContainerColor, textColor } from "../component/style";

//import Outlet react-router
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <Container
      p={0}
      m={0}
      w={"100%"}
      minW={"100vw"}
      bg={backgroundContainerColor()}
      color={textColor()}
    >
      <Outlet />
    </Container>
  );
};

export default RootLayout;
