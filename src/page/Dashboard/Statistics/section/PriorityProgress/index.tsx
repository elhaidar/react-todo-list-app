import { Accordion, Stack } from "@chakra-ui/react";
import PriorityProgressCard from "./section/PriorityProgressCard";

const PriorityProgress = () => {
  return (
    <Stack w={"90%"}>
      <Accordion allowMultiple>
        <PriorityProgressCard colorScheme="#E53E3E" priority="tinggi" />
        <PriorityProgressCard colorScheme="#ED8936" priority="sedang" />
        <PriorityProgressCard colorScheme="#805AD5" priority="rendah" />
      </Accordion>
    </Stack>
  );
};

export default PriorityProgress;
