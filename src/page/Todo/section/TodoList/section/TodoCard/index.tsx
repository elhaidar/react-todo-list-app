//import library UI
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  HStack,
  Heading,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";

//import react hooks
import { useContext, useState } from "react";

//import action button component
import ActionButtonThreeDots from "./section/ActionButtonThreeDots";

//import dispatch
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../../redux/store";

//import data type
import { todoType } from "../../../../../../type";

//import theme context
import { ThemeContext } from "../../../../../../App";

//import styling
import {
  backgroundContainerCardColor,
  buttonIconCompletedColor,
  categoryTagFontSize,
  dangerColor,
  descFontSize,
  primaryTextColor,
  tagPriorityVariant,
  textColor,
  titleFontSize,
} from "../../../../../../component/style";

//import action reducer from redux
import { switchIsCompleted } from "../../../../../../redux/slices/todoSlice";

//import util
import getDateNow from "../../../../../../util/getDateNow";

//import StatusTag component
import StatusTag from "../../../../../../component/StatusTag";

//options config for formatting date
const options: Intl.DateTimeFormatOptions = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};

const TodoCard = ({ todoItem }: { todoItem: todoType }) => {
  const theme: any = useContext(ThemeContext);
  const [isShowMore, setIsShowMore] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();

  //formatting date
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <Card
      w={"100%"}
      bg={backgroundContainerCardColor()}
      color={todoItem.completed ? buttonIconCompletedColor() : textColor()}
      minH={"200px"}
      boxShadow={"md"}
    >
      <CardHeader pb={0}>
        <HStack justify={"space-between"}>
          <Text
            fontSize={"xs"}
            color={
              todoItem.date < getDateNow() && !todoItem.completed
                ? dangerColor()
                : todoItem.completed
                ? buttonIconCompletedColor()
                : primaryTextColor()
            }
          >
            {formatDate(todoItem.date)}
          </Text>

          <ActionButtonThreeDots todoItem={todoItem} />
        </HStack>
        <Heading
          fontSize={titleFontSize()}
          py={4}
          fontWeight={"light"}
          onClick={() => setIsShowMore((prev) => !prev)}
          textOverflow={"ellipsis"}
          whiteSpace={isShowMore ? "normal" : "nowrap"}
          cursor={"default"}
          maxW={"90%"}
          overflow={"hidden"}
        >
          {todoItem.title}
        </Heading>
        <HStack>
          <Tag
            variant={tagPriorityVariant(todoItem.priority)}
            fontSize={categoryTagFontSize()}
          >
            {todoItem.priority}
          </Tag>
          <Tag
            variant={theme.currentTheme ? "primaryOutline" : "primary"}
            fontSize={categoryTagFontSize()}
          >
            #{todoItem.category}
          </Tag>
        </HStack>
      </CardHeader>
      <CardBody py={6} h={"100%"}>
        <Text
          fontSize={descFontSize()}
          overflow={"hidden"}
          opacity={0.7}
          cursor={"default"}
          onClick={() => setIsShowMore((prev) => !prev)}
          sx={
            isShowMore
              ? {}
              : {
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 1,
                }
          }
        >
          {todoItem.description}
        </Text>
      </CardBody>
      <CardFooter
        pt={0}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <StatusTag todoItem={todoItem} />
        <Checkbox
          borderColor={"gray.500"}
          colorScheme="green"
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
      </CardFooter>
    </Card>
  );
};

export default TodoCard;
