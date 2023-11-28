//import library UI
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  CardBody,
  CircularProgress,
  CircularProgressLabel,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";

//import styling
import {
  backgroundContainerColor,
  primaryColor,
  textColor,
} from "../../../../../../component/style";

//import useSelector
import { AppDispatch, useAppSelector } from "../../../../../../redux/store";

//import react hooks
import { useEffect, useMemo, useState } from "react";

//import link react-router
import { Link } from "react-router-dom";

//import TodoItem card component
import TodoItem from "../../../../../../component/TodoItem";

//import dispatch
import { useDispatch } from "react-redux";

//import action reducer redux
import { setFilter } from "../../../../../../redux/slices/todoSlice";

//import initial data
import { initialFilterState } from "../../../../../../util/data";

const PriorityProgressCard = ({
  colorScheme,
  priority,
}: {
  colorScheme: string;
  priority: string;
}) => {
  const { todo } = useAppSelector((state) => state.todo);
  const [filteredTodoByPriority, setFilteredTodoByPriority] = useState<{
    totalTodo: number;
    totalCompletedTodo: number;
  }>({
    totalTodo: 0,
    totalCompletedTodo: 0,
  });
  const dispatch = useDispatch<AppDispatch>();

  //filter data todo by priority
  useEffect(() => {
    if (todo) {
      const filterByPriority = todo.filter(
        (item) => item.priority === priority
      );
      const filterCompletedByPriority = filterByPriority.filter(
        (item) => item.completed === true
      );
      setFilteredTodoByPriority({
        totalTodo: filterByPriority.length,
        totalCompletedTodo: filterCompletedByPriority.length,
      });
    }
  }, [priority, todo]);

  //for calc progress percentage
  const valueMemo = useMemo(() => {
    const value =
      (filteredTodoByPriority.totalCompletedTodo /
        filteredTodoByPriority.totalTodo) *
      100;
    return value;
  }, [filteredTodoByPriority]);

  return (
    <AccordionItem
      border={"none"}
      h={"100%"}
      flexBasis={{ base: "100%", sm: "48%" }}
      maxW={{ base: "100%", sm: "48%", md: "100%" }}
    >
      <AccordionButton h={"100%"} w={"100%"} p={0}>
        <Card
          rounded={"xl"}
          minW="100%"
          minH={"150px"}
          h={"100%"}
          border={`2px`}
          color={
            valueMemo === 100 || Number.isNaN(valueMemo)
              ? primaryColor()
              : textColor()
          }
          borderColor={
            valueMemo === 100 || Number.isNaN(valueMemo)
              ? primaryColor()
              : colorScheme
          }
          bg={"transparent"}
        >
          <CardBody
            maxW={"100%"}
            pos={"relative"}
            h={"100%"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"flex-end"}
          >
            <Box
              pos={"absolute"}
              left={0}
              top={0}
              w={valueMemo === 100 ? "0%" : `${100 - valueMemo}%`}
              h={"100%"}
              bg={valueMemo === 100 ? "transparent" : colorScheme}
              rounded={"lg"}
            />
            <Stack zIndex={5} gap={0}>
              <Heading
                fontSize={{ base: "md", lg: "lg" }}
                fontWeight={"300"}
                textAlign={"left"}
              >
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </Heading>
              <Text fontSize={{ base: "lg", lg: "xl" }} textAlign={"left"}>
                {filteredTodoByPriority.totalCompletedTodo}/
                {filteredTodoByPriority.totalTodo} Completed
              </Text>
            </Stack>
            <CircularProgress
              position={"absolute"}
              top={4}
              right={4}
              value={valueMemo ? valueMemo : 0}
              color={valueMemo === 100 ? primaryColor() : colorScheme}
              size={"70px"}
              trackColor={
                valueMemo === 0
                  ? backgroundContainerColor()
                  : valueMemo === 100
                  ? primaryColor()
                  : "gray.300"
              }
            >
              <CircularProgressLabel
                as="span"
                fontSize={"sm"}
                color={
                  valueMemo === 100 || Number.isNaN(valueMemo)
                    ? primaryColor()
                    : textColor()
                }
              >
                {valueMemo ? valueMemo.toFixed(0) : 0}%
              </CircularProgressLabel>
            </CircularProgress>
            <AccordionIcon
              zIndex={5}
              pos={"absolute"}
              right={10}
              display={
                todo &&
                todo.filter(
                  (item) =>
                    item.priority === priority && item.completed === false
                ).length === 0
                  ? "none"
                  : "block"
              }
            />
          </CardBody>
        </Card>
      </AccordionButton>
      <AccordionPanel
        p={0}
        mt={2}
        display={
          todo &&
          todo.filter(
            (item) => item.priority === priority && item.completed === false
          ).length === 0
            ? "none"
            : "block"
        }
      >
        {todo &&
          todo
            .filter(
              (item) => item.priority === priority && item.completed === false
            )
            .slice(0, 3)
            .map((item) => (
              <Stack pb={2} w={"100%"} key={item.id}>
                <TodoItem
                  todo={item}
                  size="18px"
                  buttonGap="8px"
                  maxW="100%"
                  ellipsisMaxW="120px"
                />
              </Stack>
            ))}
        {todo &&
          todo.filter(
            (item) => item.priority === priority && item.completed === false
          ).length > 3 && (
            <Link
              to={"/todo"}
              onClick={() => {
                dispatch(
                  setFilter({ ...initialFilterState, priorities: [priority] })
                );
              }}
            >
              <Text
                mt={2}
                _hover={{
                  background: "transparent",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                }}
                textAlign={"center"}
              >
                See more
              </Text>
            </Link>
          )}
      </AccordionPanel>
    </AccordionItem>
  );
};

export default PriorityProgressCard;
