//import library UI
import { Accordion, Stack } from "@chakra-ui/react";

//import PriorityProgressCard component
import PriorityProgressCard from "./section/PriorityProgressCard";

const PriorityProgress = () => {
  return (
    <Stack w={{ base: "100%", md: "90%" }} h={"100%"}>
      <Accordion allowMultiple>
        <Stack
          direction={{ base: "row", md: "column" }}
          gap={4}
          flexWrap={"wrap"}
        >
          <PriorityProgressCard colorScheme="#E53E3E" priority="tinggi" />
          <PriorityProgressCard colorScheme="#ED8936" priority="sedang" />
          <PriorityProgressCard colorScheme="#805AD5" priority="rendah" />
        </Stack>
      </Accordion>
    </Stack>
  );
};

export default PriorityProgress;
