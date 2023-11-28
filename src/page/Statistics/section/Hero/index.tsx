//import library UI
import { Flex, HStack, Heading, Stack, Text } from "@chakra-ui/react";

//import styling
import {
  backgroundContainerColor,
  primaryColor,
} from "../../../../component/style";

//import selector redux
import { AppDispatch, useAppSelector } from "../../../../redux/store";

//import data type
import { todoType } from "../../../../type";

//import Link react-router
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFilter } from "../../../../redux/slices/todoSlice";
import { initialFilterState } from "../../../../util/data";

const Hero = () => {
  //get data todo from redux
  const { todo } = useAppSelector((state) => state.todo);

  const dispatch = useDispatch<AppDispatch>();

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
      p={{ base: 8, lg: 16 }}
      w={"100%"}
      h={"100%"}
      maxH={"500px"}
      border={"2px"}
      borderColor={primaryColor()}
      rounded={{ base: "xl", lg: "3xl" }}
      gap={{ base: 6, lg: 8 }}
      color={primaryColor()}
    >
      <Stack gap={{ base: 0, lg: 4 }}>
        <Heading fontSize={{ base: "2xl", lg: "4xl" }}>Todo Done</Heading>
        <Text fontSize={"lg"} letterSpacing={"widest"}>
          keep it up
        </Text>
      </Stack>
      <HStack w={"100%"} justify={"center"}>
        <Stack
          rounded={"full"}
          bg={primaryColor()}
          color={backgroundContainerColor()}
          p={{ base: 6, lg: 12 }}
        >
          <Text fontSize={{ base: "4xl", lg: "5xl" }} fontWeight={"bold"}>
            {todo && getTodoCompletedData()}/{todo && todo.length}
          </Text>
        </Stack>
      </HStack>
      <Link
        to={"/todo"}
        style={{ width: "100%" }}
        onClick={() => dispatch(setFilter(initialFilterState))}
      >
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
