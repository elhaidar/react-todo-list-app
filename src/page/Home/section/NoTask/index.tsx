//import library UI
import { Image, Stack, Text } from "@chakra-ui/react";

//import image asset
import walkIllustration from "../../../../assets/walk_illustration.svg";

const NoTask = () => {
  return (
    <Stack w={"100%"} align={"center"} justify={"center"} py={"8%"}>
      <Image src={walkIllustration} maxW={{ base: "250px", lg: "400px" }} />
      <Text mt={4}>No task :{")"}</Text>
    </Stack>
  );
};

export default NoTask;
