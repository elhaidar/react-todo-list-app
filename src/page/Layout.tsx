//import Outlet react-router
import { Outlet } from "react-router-dom";

//import library UI
import { Box, Stack } from "@chakra-ui/react";

//import Sidebar component
import Sidebar from "../component/Sidebar";

//import styling
import { backgroundContainerColor, textColor } from "../component/style";

const Layout = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={{ base: "flex-start", lg: "space-between" }}
      flexDirection={{ base: "column", lg: "row" }}
      w={"100%"}
      maxWidth={"8xl"}
      pt={{ lg: "24px" }}
      h={"100%"}
      gap={0}
      mx={"auto"}
      px={{ base: "8%", lg: "64px" }}
    >
      <Sidebar />
      <Box
        w={"100%"}
        minH={"100vh"}
        bg={backgroundContainerColor()}
        color={textColor()}
        py={{ base: "0px", lg: "32px" }}
        px={{ base: "0px", lg: "64px" }}
      >
        <Stack w={"100%"}>
          <Outlet />
        </Stack>
      </Box>
    </Box>
  );
};

export default Layout;
