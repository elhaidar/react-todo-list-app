//import library UI
import { HStack, Heading, Icon, Stack, Tag, Text } from "@chakra-ui/react";

//import styling
import {
  backgroundContainerCardColor,
  buttonIconCompletedColor,
  cardBorderColor,
  colorByDate,
  tagPriorityVariant,
  textColor,
} from "../../../../component/style";

//import data type
import { trashType } from "../../../../type";

//import icon
import { MdSignalCellularAlt, MdSignalCellularAlt2Bar } from "react-icons/md";

//import action button component wrapper
import ActionButtonThreeDots from "./fragment/ActionButtonThreeDots";

const options: Intl.DateTimeFormatOptions = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};

const DeletedTodoItem = ({ todoItem }: { todoItem: trashType }) => {
  return (
    <Stack
      h={"100%"}
      opacity={0.6}
      _hover={{ opacity: 0.9 }}
      cursor={"default"}
    >
      <HStack
        gap={2}
        alignItems={"space-between"}
        p={8}
        bg={backgroundContainerCardColor()}
        rounded={"lg"}
        h={"100%"}
        color={todoItem.completed ? buttonIconCompletedColor() : textColor()}
      >
        <Stack w={"100%"}>
          <HStack
            justify={"space-between"}
            align={"flex-end"}
            color={textColor()}
          >
            <Text
              fontSize={"sm"}
              color={
                todoItem.completed
                  ? buttonIconCompletedColor()
                  : colorByDate(todoItem.date)
              }
              fontStyle={"italic"}
            >
              {new Date(todoItem.date).toLocaleDateString(undefined, options)}
            </Text>
            <ActionButtonThreeDots todoItem={todoItem} />
          </HStack>
          <HStack justify={"space-between"} align={"center"} gap={8} py={4}>
            <Stack>
              <HStack gap={2}>
                <Heading fontSize={"lg"} fontWeight={"light"}>
                  {todoItem.title}
                </Heading>
                <Tag
                  variant={tagPriorityVariant("rendah")}
                  w={"min-content"}
                  fontSize={"xs"}
                >
                  #{todoItem.category}
                </Tag>
                <HStack
                  align={"flex-end"}
                  gap={1}
                  color={cardBorderColor(todoItem.priority)}
                >
                  <Text fontSize={"xs"}>{todoItem.priority}</Text>

                  <Icon
                    as={
                      todoItem.priority === "tinggi"
                        ? MdSignalCellularAlt
                        : MdSignalCellularAlt2Bar
                    }
                    w={6}
                    h={6}
                  />
                </HStack>
              </HStack>
              <Text opacity={0.7} fontSize={"sm"}>
                {todoItem.description}
              </Text>
            </Stack>
          </HStack>
          <HStack align={"center"} justify={"space-between"} h={"100%"}>
            <Text
              fontSize={"sm"}
              color={textColor()}
              opacity={0.7}
              fontWeight={"500"}
            >
              Deleted on{" "}
              {new Date(todoItem.deletedAt).toLocaleDateString(
                undefined,
                options
              )}
            </Text>
          </HStack>
        </Stack>
      </HStack>
    </Stack>
  );
};

export default DeletedTodoItem;
