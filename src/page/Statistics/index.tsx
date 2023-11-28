//import library UI
import { Heading, Icon, Stack } from "@chakra-ui/react";

//import hero section
import Hero from "./section/Hero";

//import priority progress component
import PriorityProgress from "./section/PriorityProgress";

//import styling
import { primaryColor } from "../../component/style";

//import icon
import { IoIosStats } from "react-icons/io";

const StatisticsPage = () => {
  return (
    <Stack w={"100%"} pb={"32px"}>
      <Heading
        color={primaryColor()}
        display={"flex"}
        alignItems={"center"}
        gap={4}
        mb={4}
      >
        Statistics <Icon as={IoIosStats} />
      </Heading>
      <Stack
        direction={{ base: "column", md: "row" }}
        justify={"center"}
        align={"flex-start"}
        w={"100%"}
        h={"100%"}
        gap={{ base: 6 }}
      >
        <Hero />
        <Stack w={"100%"} align={"center"}>
          <PriorityProgress />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default StatisticsPage;
