//import library UI
import {
  Checkbox,
  HStack,
  Heading,
  Icon,
  Stack,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";

//import styling
import {
  backgroundContainerCardColor,
  buttonIconCompletedColor,
  cardBorderColor,
  categoryTagFontSize,
  colorByDate,
  dateFontSize,
  descFontSize,
  tagPriorityVariant,
  textColor,
  titleFontSize,
} from "../../../../component/style";

//import data type
import { todoType } from "../../../../type";
import { IconType } from "react-icons";

//import status tag component
import StatusTag from "../../../../component/StatusTag";

//import action button component
import EditAction from "../../../../component/TodoItem/section/EditAction";
import DeleteAction from "../../../../component/TodoItem/section/DeleteAction";

//import action reducer from redux
import { switchIsCompleted } from "../../../../redux/slices/todoSlice";

//import dispatch for redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store";

//import icon
import { MdSignalCellularAlt, MdSignalCellularAlt2Bar } from "react-icons/md";

const options: Intl.DateTimeFormatOptions = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};

const TodoItemCard = ({
  todoItem,
  icon,
}: {
  todoItem: todoType;
  icon: IconType;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();

  return (
    <Stack h={"100%"} boxShadow={"md"}>
      <HStack
        gap={2}
        alignItems={"space-between"}
        px={4}
        py={6}
        bg={backgroundContainerCardColor()}
        rounded={"lg"}
        h={"100%"}
        color={todoItem.completed ? buttonIconCompletedColor() : textColor()}
      >
        <Icon
          as={icon}
          color={
            todoItem.completed
              ? buttonIconCompletedColor()
              : colorByDate(todoItem.date)
          }
          fontSize={"3xl"}
        />
        <Stack w={"90%"} pr={{ base: 0, lg: 3 }}>
          <HStack justify={"space-between"} align={"flex-end"}>
            <StatusTag todoItem={todoItem} px={2} py={0} variant="fill" />
            <HStack
              align={"flex-end"}
              gap={1}
              color={cardBorderColor(todoItem.priority)}
            >
              <Text fontSize={{ base: "10px", lg: "xs" }}>
                {todoItem.priority}
              </Text>

              <Icon
                as={
                  todoItem.priority === "tinggi"
                    ? MdSignalCellularAlt
                    : MdSignalCellularAlt2Bar
                }
                w={{ base: 5, lg: 6 }}
                h={{ base: 5, lg: 6 }}
              />
            </HStack>
          </HStack>
          <HStack
            justify={"space-between"}
            align={"center"}
            gap={{ base: 4, lg: 8 }}
            py={4}
          >
            <Stack>
              <HStack gap={2}>
                <Heading fontSize={titleFontSize()} fontWeight={"light"}>
                  {todoItem.title}
                </Heading>
                <Stack>
                  <Tag
                    variant={tagPriorityVariant("rendah")}
                    w={"max-content"}
                    fontSize={categoryTagFontSize()}
                  >
                    #{todoItem.category}
                  </Tag>
                </Stack>
              </HStack>
              <Text opacity={0.7} fontSize={descFontSize()}>
                {todoItem.description}
              </Text>
            </Stack>
            <Stack>
              <Checkbox
                colorScheme="green"
                borderColor={"gray.500"}
                isChecked={todoItem.completed}
                name="checkbox-status-todo"
                onChange={() => {
                  dispatch(switchIsCompleted({ id: todoItem.id }));
                  if (!todoItem.completed) {
                    toast({
                      isClosable: true,
                      position: "top-right",
                      status: "success",
                      title: `Success marked todo as complete!`,
                    });
                  }
                }}
              />
            </Stack>
          </HStack>
          <HStack align={"center"} justify={"space-between"} h={"100%"}>
            <Text
              fontSize={dateFontSize()}
              color={
                todoItem.completed
                  ? buttonIconCompletedColor()
                  : colorByDate(todoItem.date)
              }
            >
              {new Date(todoItem.date).toLocaleDateString(undefined, options)}
            </Text>
            <HStack align={"center"} gap={4}>
              <EditAction data={todoItem} size="18px" />
              <DeleteAction todo={todoItem} size="18px" />
            </HStack>
          </HStack>
        </Stack>
      </HStack>
    </Stack>
  );
};

export default TodoItemCard;
