import { Heading, Icon, Image, Stack, Text } from "@chakra-ui/react";
import { primaryColor } from "../../../component/style";
import { BsFillTrash3Fill } from "react-icons/bs";
import DeletedTodoItem from "./section/DeletedTodoItem";
import { useAppSelector } from "../../../redux/store";
import Box from "../../../assets/Box.svg";

const TrashPage = () => {
  const { trash } = useAppSelector((state) => state.todo);

  return (
    <Stack w={"100%"} px={12} pb={8}>
      <Heading
        color={primaryColor()}
        display={"flex"}
        alignItems={"center"}
        gap={4}
        mb={4}
      >
        Trash <Icon as={BsFillTrash3Fill} />
      </Heading>
      <Stack gap={4}>
        {trash && trash.length === 0 && (
          <Stack w={"100%"} align={"center"} justify={"center"} gap={8} py={8}>
            <Image src={Box} alt="box-empty" maxW={"300px"} />
            <Text fontSize={"lg"}>Trash is empty</Text>
          </Stack>
        )}
        {trash &&
          trash.length > 0 &&
          trash.map((item) => (
            <DeletedTodoItem key={item.id} todoItem={item} />
          ))}
      </Stack>
    </Stack>
  );
};

export default TrashPage;
