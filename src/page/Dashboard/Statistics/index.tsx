import { HStack, Heading, Icon, Stack } from "@chakra-ui/react";
//import hero section
import Hero from "./section/Hero";
//import priority progress component
import PriorityProgress from "./section/PriorityProgress";
import { primaryColor } from "../../../component/style";
import { IoIosStats } from "react-icons/io";

const StatisticsPage = () => {
  return (
    <Stack w={"100%"} px={12}>
      <Heading
        color={primaryColor()}
        display={"flex"}
        alignItems={"center"}
        gap={4}
        mb={4}
      >
        Statistics <Icon as={IoIosStats} />
      </Heading>
      <HStack justify={"center"} align={"flex-start"} w={"100%"} h={"100%"}>
        <Hero />
        <Stack w={"100%"} align={"center"}>
          <PriorityProgress />
        </Stack>
      </HStack>
    </Stack>
  );
};

export default StatisticsPage;
