//import library UI
import {
  Heading,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

//import selector
import { useAppSelector } from "../../redux/store";

//import todo item card component
import TodoItemCard from "./section/TodoItemCard";

//import util func
import getDateNow from "../../util/getDateNow";
import { compareByDateDesc, compareByPriorityDesc } from "../../util/sort";

//import styling
import {
  backgroundContainerColor,
  backgroundContainerSecondaryColor,
  dangerColor,
  primaryTextColor,
  textColor,
  textUnselectedColor,
} from "../../component/style";

//import icon
import { BiTimeFive } from "react-icons/bi";
import { PiClockClockwiseBold, PiClockCountdownFill } from "react-icons/pi";

//import TabLabel component
import TabLabel from "./section/TabLabel";

//import react hooks
import { useMemo } from "react";

//import NoTask component
import NoTask from "./section/NoTask";

const tomorrowDate = new Date(getDateNow());
tomorrowDate.setDate(tomorrowDate.getDate() + 1);

const HomePage = () => {
  const { todo } = useAppSelector((state) => state.todo);

  //memoize overdueTodo = filter todo < today
  const overdueTodo = useMemo(() => {
    if (todo) {
      return todo.filter((item) => item.date < getDateNow() && !item.completed);
    }
  }, [todo]);

  //memoize todayTodo = filter todo === today
  const todayTodo = useMemo(() => {
    if (todo) {
      return todo.filter(
        (item) => item.date === getDateNow() && !item.completed
      );
    }
  }, [todo]);

  //memoize tomorrowTodo = filter todo === tomorrowDate
  const tomorrowTodo = useMemo(() => {
    if (todo) {
      return todo.filter(
        (item) =>
          new Date(item.date).getDate() === tomorrowDate.getDate() &&
          !item.completed
      );
    }
  }, [todo]);

  return (
    <Stack w={"100%"} mb={8}>
      <Stack>
        <Heading color={primaryTextColor()} fontSize={{ base: "3xl" }}>
          Hey mate.
        </Heading>
        {overdueTodo && overdueTodo.length > 0 && (
          <Text fontSize={{ base: "sm", md: "md" }}>
            You have{" "}
            <Text as={"span"} color={dangerColor()} fontWeight={"bold"}>
              {overdueTodo.length + " overdue tasks"}
            </Text>
            , please check it out!
          </Text>
        )}
        {overdueTodo &&
          todayTodo &&
          overdueTodo.length === 0 &&
          todayTodo.length > 0 && (
            <Text>
              You have{" "}
              <Text as={"span"} color={primaryTextColor()} fontWeight={"bold"}>
                {todayTodo.length + " important tasks "}
              </Text>
              today
            </Text>
          )}
        {overdueTodo &&
          todayTodo &&
          tomorrowTodo &&
          overdueTodo.length === 0 &&
          todayTodo.length === 0 &&
          tomorrowTodo.length > 0 && (
            <Text>
              You have{" "}
              <Text as={"span"} color={primaryTextColor()} fontWeight={"bold"}>
                {tomorrowTodo.length + " tasks "}
              </Text>
              to do tomorrow
            </Text>
          )}
        {overdueTodo &&
          todayTodo &&
          tomorrowTodo &&
          overdueTodo.length === 0 &&
          todayTodo.length === 0 &&
          tomorrowTodo.length === 0 && (
            <Text color={primaryTextColor()}>All tasks done for now</Text>
          )}
      </Stack>
      <Tabs
        size="md"
        variant="enclosed"
        isFitted
        py={8}
        defaultIndex={
          overdueTodo && overdueTodo.length > 0
            ? 0
            : todayTodo && todayTodo.length > 0
            ? 1
            : tomorrowTodo && tomorrowTodo.length > 0
            ? 2
            : 1
        }
      >
        <TabList
          borderColor={backgroundContainerSecondaryColor()}
          color={textUnselectedColor()}
        >
          <Tab
            _selected={{
              borderBottomColor: backgroundContainerColor(),
              borderTopColor: backgroundContainerSecondaryColor(),
              borderLeftColor: backgroundContainerSecondaryColor(),
              borderRightColor: backgroundContainerSecondaryColor(),
              color: textColor(),
            }}
            fontSize={{ base: "xs", sm: "sm", lg: "md" }}
          >
            <TabLabel
              title="URGENT"
              counter={overdueTodo ? overdueTodo.length : 0}
            />
          </Tab>
          <Tab
            _selected={{
              borderBottomColor: backgroundContainerColor(),
              borderTopColor: backgroundContainerSecondaryColor(),
              borderLeftColor: backgroundContainerSecondaryColor(),
              borderRightColor: backgroundContainerSecondaryColor(),
              color: textColor(),
            }}
            fontSize={{ base: "xs", sm: "sm", lg: "md" }}
          >
            <TabLabel
              title="TODAY"
              colorScheme={"purple"}
              counter={todayTodo ? todayTodo.length : 0}
            />
          </Tab>
          <Tab
            _selected={{
              borderBottomColor: backgroundContainerColor(),
              borderTopColor: backgroundContainerSecondaryColor(),
              borderLeftColor: backgroundContainerSecondaryColor(),
              borderRightColor: backgroundContainerSecondaryColor(),
              color: textColor(),
            }}
            fontSize={{ base: "xs", sm: "sm", lg: "md" }}
          >
            <TabLabel
              title="TOMORROW"
              colorScheme={"purple"}
              counter={tomorrowTodo ? tomorrowTodo.length : 0}
            />
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={0} mt={5}>
            {/* PANEL URGENT */}
            <Stack w={"100%"} gap={4}>
              {overdueTodo &&
                overdueTodo
                  .sort(compareByDateDesc)
                  .map((todoItem) => (
                    <TodoItemCard
                      todoItem={todoItem}
                      key={todoItem.id}
                      icon={BiTimeFive}
                    />
                  ))}
              {overdueTodo && overdueTodo.length === 0 && <NoTask />}
            </Stack>
          </TabPanel>
          <TabPanel p={0} mt={5}>
            {/* PANEL TODAY */}
            <Stack w={"100%"} gap={4}>
              {todo &&
                todo
                  .filter((item) => item.date === getDateNow())
                  .sort(compareByPriorityDesc)
                  .map((todoItem) => (
                    <TodoItemCard
                      icon={PiClockCountdownFill}
                      todoItem={todoItem}
                      key={todoItem.id}
                    />
                  ))}
              {todo &&
                todo.filter((item) => item.date === getDateNow()).length ===
                  0 && <NoTask />}
            </Stack>
          </TabPanel>
          <TabPanel p={0} mt={5}>
            {/* PANEL TOMORROW */}
            <Stack w={"100%"} gap={4}>
              {todo &&
                todo
                  .filter(
                    (item) =>
                      new Date(item.date).getDate() === tomorrowDate.getDate()
                  )
                  .sort(compareByPriorityDesc)
                  .map((todoItem) => (
                    <TodoItemCard
                      icon={PiClockClockwiseBold}
                      todoItem={todoItem}
                      key={todoItem.id}
                    />
                  ))}
              {todo &&
                todo.filter(
                  (item) =>
                    new Date(item.date).getDate() === tomorrowDate.getDate()
                ).length === 0 && <NoTask />}
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
};

export default HomePage;
