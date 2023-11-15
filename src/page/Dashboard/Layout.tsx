import { Outlet } from "react-router-dom";
import { Container, Stack } from "@chakra-ui/react";
import Sidebar from "../../component/Sidebar";
import { backgroundContainerColor, textColor } from "../../component/style";

//Layout dari Dashboard
const Layout = () => {
  return (
    <Container
      maxWidth={"8xl"}
      bg={backgroundContainerColor()}
      color={textColor()}
      px={16}
    >
      <Stack direction={"row"} h={"100%"} minH={"100vh"}>
        <Sidebar />
        <Stack w={"100%"} align={"center"} marginTop="10vh">
          <Outlet />
        </Stack>
      </Stack>
    </Container>
  );
};

export default Layout;
