import { Stack, Text } from "@chakra-ui/react";

const TabLabel = ({
  title,
  counter,
  colorScheme = "red",
}: {
  title: string;
  counter: number;
  colorScheme?: string;
}) => {
  return (
    <Stack pos={"relative"}>
      <Stack
        pos={"absolute"}
        right={-5}
        top={-1}
        rounded={"full"}
        bg={`${colorScheme === "red" ? "red.300" : colorScheme + ".500"}`}
        color={`white`}
        w={4}
        h={4}
        align={"center"}
        justifyContent={"center"}
        fontSize={"10px"}
        p={"6px"}
        display={counter > 0 ? "flex" : "none"}
      >
        <Text as={"span"}>{counter}</Text>
      </Stack>
      <Text>{title}</Text>
    </Stack>
  );
};

export default TabLabel;
