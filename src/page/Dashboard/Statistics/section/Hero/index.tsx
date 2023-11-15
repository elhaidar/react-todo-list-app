import { Flex, HStack, Heading, Stack, Text } from "@chakra-ui/react";
//import styling
import {
  backgroundContainerColor,
  primaryColor,
} from "../../../../../component/style";
//import selector redux
import { useAppSelector } from "../../../../../redux/store";
//import data type
import { todoType } from "../../../../../type";
import { Link } from "react-router-dom";

const Hero = () => {
  //get data todo from redux
  const { todo } = useAppSelector((state) => state.todo);
  //variable contain data todo completed
  let dataTodoCompleted: todoType[] = [];
  //function for calculate todo completed & total todo
  const getTodoCompletedData = () => {
    if (todo) {
      dataTodoCompleted = todo.filter((item) => item.completed === true);
      return dataTodoCompleted.length;
    }
    return 0;
  };

  return (
    <Flex
      direction={"column"}
      align={"flex-start"}
      justify={"center"}
      p={12}
      w={"100%"}
      maxW={"500px"}
      h={"100%"}
      maxH={"500px"}
      border={"2px"}
      borderColor={primaryColor()}
      rounded={"3xl"}
      gap={8}
      color={primaryColor()}
    >
      <Stack>
        <Heading fontSize={"4xl"}>Todo Done</Heading>
        <Text fontSize={"lg"} letterSpacing={"widest"}>
          keep it up
        </Text>
      </Stack>
      <HStack w={"100%"} justify={"center"}>
        <Stack
          rounded={"full"}
          bg={primaryColor()}
          color={backgroundContainerColor()}
          p={12}
        >
          <Text fontSize={"5xl"} fontWeight={"bold"}>
            {todo && getTodoCompletedData()}/{todo && todo.length}
          </Text>
        </Stack>
      </HStack>
      <Link to={"/todo"} style={{ width: "100%" }}>
        <Text
          mt={4}
          _hover={{
            background: "transparent",
            textDecoration: "underline",
            textUnderlineOffset: "6px",
          }}
          textAlign={"center"}
        >
          See all todo
        </Text>
      </Link>
    </Flex>
  );
};

export default Hero;
