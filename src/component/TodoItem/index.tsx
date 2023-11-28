/* eslint-disable @typescript-eslint/no-explicit-any */
//import library UI
import {
  Card,
  CardBody,
  CardProps,
  Flex,
  HStack,
  List,
  ListItem,
  Stack,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";

//import styling
import {
  backgroundContainerCardColor,
  buttonIconColor,
  buttonIconCompletedColor,
  buttonIconCompletedHoverStyle,
  buttonIconHoverStyle,
  cardBorderColor,
  cardBorderWidth,
  cardCompletedBorderColor,
  categoryTagFontSize,
  dateFontSize,
  descFontSize,
  tagPriorityVariant,
  textColor,
} from "../style";

//import icon
import { CheckCircleIcon, TriangleDownIcon } from "@chakra-ui/icons";

//import react hooks
import { useState } from "react";

//import component Delete todo
import DeleteAction from "./section/DeleteAction";

//import component Edit todo
import EditAction from "./section/EditAction";

//import data type for useDispatch
import { AppDispatch } from "../../redux/store";

//import dispatch
import { useDispatch } from "react-redux";

//import action reducer for switch status completed todo
import { switchIsCompleted } from "../../redux/slices/todoSlice";

//import data type
import { todoType } from "../../type";

interface TodoItemProp extends CardProps {
  todo: todoType;
  size?: string;
  buttonGap?: string;
  ellipsisMaxW?: string;
}

//props todo for receive todoItem data
const TodoItem = ({
  todo,
  size = "28px",
  buttonGap = "18px",
  ellipsisMaxW = "150px",
  ...rest
}: TodoItemProp) => {
  //state for expand todo card
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  //dispatch hook for trigger action reducer from redux
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();

  return (
    <>
      <Card
        bg={backgroundContainerCardColor()}
        border={cardBorderWidth()}
        borderColor={
          todo.completed
            ? cardCompletedBorderColor()
            : cardBorderColor(todo.priority)
        }
        color={textColor()}
        mb={1}
        boxShadow={"lg"}
        minW={{ base: "100%", sm: "45%" }}
        height={isExpanded ? "auto" : "min-content"}
        {...rest}
      >
        <CardBody>
          <Flex justify={"space-between"} alignItems={"center"}>
            <HStack gap={4} mr={2} w={"50%"}>
              <CheckCircleIcon
                w={"32px"}
                h={"32px"}
                cursor={"pointer"}
                color={
                  todo.completed
                    ? buttonIconCompletedColor()
                    : buttonIconColor()
                }
                _hover={
                  todo.completed
                    ? buttonIconCompletedHoverStyle()
                    : buttonIconHoverStyle(todo.priority)
                }
                onClick={() => {
                  dispatch(switchIsCompleted({ id: todo.id }));
                  if (!todo.completed) {
                    toast({
                      isClosable: true,
                      position: "top-right",
                      status: "success",
                      title: `Success marked todo as complete!`,
                    });
                  }
                }}
              />
              {todo.completed && (
                <Text
                  as={"s"}
                  color={buttonIconCompletedColor()}
                  whiteSpace={isExpanded ? "normal" : "nowrap"}
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                  minW={isExpanded ? "100%" : "50%"}
                  fontSize={{ base: "sm", lg: "md" }}
                >
                  {todo.title}
                </Text>
              )}
              {!todo.completed && (
                <Text
                  whiteSpace={isExpanded ? "normal" : "nowrap"}
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                  minW={isExpanded ? "100%" : "50%"}
                  fontSize={{ base: "sm", lg: "md" }}
                >
                  {todo.title}
                </Text>
              )}
            </HStack>
            <HStack gap={buttonGap}>
              <DeleteAction todo={todo} size={size} />
              <EditAction data={todo} size={size} />
              <TriangleDownIcon
                w={"16px"}
                h={"16px"}
                cursor={"pointer"}
                color={buttonIconColor()}
                _hover={
                  todo.completed
                    ? buttonIconCompletedHoverStyle()
                    : buttonIconHoverStyle(todo.priority)
                }
                onClick={() => setIsExpanded((prev) => !prev)}
              />
            </HStack>
          </Flex>
          {isExpanded && (
            <>
              <Stack my={8}>
                <Text fontSize={descFontSize()}>{todo.description}</Text>
              </Stack>
              <List
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <ListItem
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignContent={"center"}
                  gap={4}
                >
                  <Tag
                    variant={tagPriorityVariant(todo.priority)}
                    fontSize={categoryTagFontSize()}
                  >
                    {todo.priority}
                  </Tag>
                  <Tag
                    variant={tagPriorityVariant("rendah")}
                    fontSize={categoryTagFontSize()}
                  >
                    {todo.category}
                  </Tag>
                </ListItem>
                <ListItem
                  fontStyle={"italic"}
                  color={textColor()}
                  fontSize={dateFontSize()}
                >
                  {todo.date}
                </ListItem>
              </List>
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default TodoItem;
