import { Container } from "@chakra-ui/react";
import { backgroundContainerColor, textColor } from "../component/style";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <Container
      maxWidth={"8xl"}
      minW={"100vw"}
      minH={"100vh"}
      bg={backgroundContainerColor()}
      color={textColor()}
      px={16}
    >
      <Outlet />
    </Container>
  );
};

export default RootLayout;
