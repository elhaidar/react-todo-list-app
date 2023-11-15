import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox,
  Divider,
  HStack,
  Stack,
  useToast,
} from "@chakra-ui/react";
//import styling
import {
  primaryColor,
  scrollBarPrimaryStyleSx,
  textColor,
} from "../../../../../../../component/style";
//import todo item component
import TimelineTodoItem from "../TimelineTodoItem";
//import data type
import { todoType } from "../../../../../../../type";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../../../redux/store";
//import action reducer from redux
import { switchIsCompleted } from "../../../../../../../redux/slices/todoSlice";
import { useEffect, useState } from "react";

const options: Intl.DateTimeFormatOptions = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};
const PastTodo = ({
  filteredTodoByDate,
}: {
  filteredTodoByDate: todoType[];
}) => {
  const [groupedTodoByDate, setGroupedTodoByDate] = useState<{
    [key: string]: todoType[];
  }>({});

  const dispatch = useDispatch<AppDispatch>();
  const uniqueDates: Set<string> = new Set(
    filteredTodoByDate.map((item: todoType) => item.date)
  );
  const dates = [...uniqueDates];
  const toast = useToast();

  useEffect(() => {
    // Group the data by date
    const updatedGroupedData: { [key: string]: todoType[] } = {};

    filteredTodoByDate.forEach((item: todoType) => {
      if (!updatedGroupedData[item.date]) {
        updatedGroupedData[item.date] = [];
      }
      updatedGroupedData[item.date].push(item);
    });

    setGroupedTodoByDate(updatedGroupedData);
  }, [filteredTodoByDate]);

  return (
    <Accordion
      allowMultiple
      w={"100%"}
      maxH={"300px"}
      overflowY={"auto"}
      overflowX={"hidden"}
      sx={scrollBarPrimaryStyleSx()}
    >
      {dates &&
        dates.map((date) => (
          <AccordionItem
            borderY={"none"}
            borderColor={textColor()}
            ml={4}
            w={"100%"}
            key={date}
            pr={4}
          >
            <AccordionButton
              w={"100%"}
              _hover={{ background: "transparent" }}
              py={4}
            >
              <Stack w={"100%"}>
                <HStack>
                  <Box as="span" flex="1" textAlign="left">
                    {new Date(date).toLocaleDateString(undefined, options)}
                  </Box>
                  <AccordionIcon color={primaryColor()} />
                </HStack>
                <Divider borderColor={primaryColor()} />
              </Stack>
            </AccordionButton>
            <AccordionPanel ml={4} p={0} pb={4}>
              <Stack w={"100%"} gap={6} align={"flex-end"} pt={2} pr={4}>
                {groupedTodoByDate[date] &&
                  groupedTodoByDate[date].map((item) => (
                    <HStack align={"flex-start"} w={"100%"} key={item.id}>
                      <Checkbox
                        name="checkbox-completed-timeline-todo"
                        mt={1}
                        isChecked={item.completed}
                        onChange={() => {
                          dispatch(switchIsCompleted({ id: item.id }));
                          if (!item.completed) {
                            toast({
                              isClosable: true,
                              position: "top-right",
                              status: "success",
                              title: `Success marked todo as complete!`,
                            });
                          }
                        }}
                        variant={"circular"}
                        colorScheme="green"
                        size={"md"}
                        py={2}
                        borderColor={"gray.300"}
                      >
                        {" "}
                      </Checkbox>
                      <TimelineTodoItem
                        isChecked={item.completed}
                        todoItem={item}
                      />
                    </HStack>
                  ))}
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        ))}
    </Accordion>
  );
};

export default PastTodo;
