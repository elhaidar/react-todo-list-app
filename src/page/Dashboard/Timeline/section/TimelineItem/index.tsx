import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  CardBody,
  Checkbox,
  Divider,
  HStack,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
//import styling
import {
  backgroundContainerCardColor,
  cardOpacity,
  cardVagueTextColor,
  primaryColor,
  textColor,
} from "../../../../../component/style";
import { AppDispatch, useAppSelector } from "../../../../../redux/store";
//import TimeTodoItem component as accordion item
import TimelineTodoItem from "./section/TimelineTodoItem";
import { useDispatch } from "react-redux";
//import action reducer from redux
import { switchIsCompleted } from "../../../../../redux/slices/todoSlice";
//import util func
import getDateNow from "../../../../../util/getDateNow";
import { compareByDateDesc } from "../../../../../util/sort";
import { AddIcon } from "@chakra-ui/icons";
//import custom form component
import CustomForm from "../../../../../component/Form";
//import PastTodo component for past accordion item panel
import PastTodo from "./section/PastTodo";

//options config for formatting date
const options: Intl.DateTimeFormatOptions = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};
const dateNow = new Date(getDateNow());
const tomorrowDate = new Date(getDateNow());
tomorrowDate.setDate(tomorrowDate.getDate() + 1);

const TimelineItem = ({
  date,
  isPast = false,
}: {
  date: string;
  isPast?: boolean;
}) => {
  const { todo } = useAppSelector((state) => state.todo);
  const dispatch = useDispatch<AppDispatch>();
  const dateData = new Date(date);
  const formattedDate = new Date(date).toLocaleDateString(undefined, options);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  //filter todo by date
  const filteredTodoByDate = todo
    ? todo
        .filter((t) => (isPast ? t.date < getDateNow() : t.date === date))
        .sort(compareByDateDesc)
    : [];

  return (
    <AccordionItem
      border={"none"}
      opacity={isPast ? 0.6 : 1}
      color={textColor()}
    >
      <AccordionButton>
        <Stack w={"100%"}>
          <HStack>
            <Box as="span" flex="1" textAlign="left">
              {dateData.getDate() === dateNow.getDate() && "Today"}
              {dateData.getDate() === tomorrowDate.getDate() && "Tomorrow"}
              {dateData.getDate() !== dateNow.getDate() &&
                dateData.getDate() !== tomorrowDate.getDate() &&
                formattedDate !== "Invalid Date" &&
                formattedDate}
              {formattedDate === "Invalid Date" && "Past"}
            </Box>
            <AccordionIcon color={primaryColor()} />
          </HStack>
          <Divider borderColor={primaryColor()} />
        </Stack>
      </AccordionButton>
      <AccordionPanel pb={0}>
        <Stack w={"100%"} align={"flex-end"} pt={2}>
          {filteredTodoByDate.length === 0 ? (
            <Text w={"100%"} fontSize={"sm"} opacity={0.5}>
              No task for today :{")"}
            </Text>
          ) : isPast ? (
            <PastTodo filteredTodoByDate={filteredTodoByDate} />
          ) : (
            filteredTodoByDate.map((item) => (
              <HStack key={item.id} align={"flex-start"} w={"100%"}>
                <Checkbox
                  mt={1}
                  name="checkbox-completed-timeline-todo"
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
                <TimelineTodoItem isChecked={item.completed} todoItem={item} />
              </HStack>
            ))
          )}

          <Card
            display={isPast ? "none" : "block"}
            w={"95%"}
            bg={backgroundContainerCardColor()}
            opacity={cardOpacity()}
            color={cardVagueTextColor()}
            _hover={{ opacity: 1 }}
            cursor={"pointer"}
            boxShadow={"md"}
            onClick={onOpen}
            rounded={"full"}
          >
            <CardBody alignItems={"center"} justifyContent={"center"} p={4}>
              <HStack
                alignItems={"center"}
                justifyContent={"center"}
                h={"100%"}
              >
                <AddIcon />
                <Text>Add Todo</Text>
              </HStack>
            </CardBody>
          </Card>
        </Stack>
      </AccordionPanel>
      <CustomForm
        title="Add Todo"
        isOpen={isOpen}
        onClose={onClose}
        dateSelected={date}
      />
    </AccordionItem>
  );
};

export default TimelineItem;
