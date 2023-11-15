import {
  HStack,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
//import styling
import {
  buttonIconCompletedColor,
  dangerColor,
  primaryColor,
} from "../../../component/style";
//import search component
import Search from "../Todo/section/Search";
//import action button component
import FilterAction from "./section/FilterAction";
import SortAction from "./section/SortAction";
import FileAction from "./section/FileAction";
//import todolist component
import TodoList from "./section/TodoList";

const TodoPage = () => {
  return (
    <Stack w={"100%"} px={12}>
      <Search />
      <Tabs variant="soft-rounded" w={"100%"}>
        <TabList
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          px={4}
        >
          <HStack gap={4}>
            <Tab _selected={{ background: primaryColor(), color: "white" }}>
              All
            </Tab>
            <Tab
              _selected={{
                background: buttonIconCompletedColor(),
                color: "white",
              }}
            >
              Completed
            </Tab>
            <Tab _selected={{ background: dangerColor(), color: "white" }}>
              Ongoing
            </Tab>
          </HStack>
          <HStack>
            <FilterAction />
            <SortAction />
            <FileAction />
          </HStack>
        </TabList>
        <TabPanels>
          <TabPanel>
            {/* ALL */}
            <TodoList panel="all" />
          </TabPanel>
          <TabPanel>
            {/* Completed */}
            <TodoList panel="completed" />
          </TabPanel>
          <TabPanel>
            {/* Ongoing */}
            <TodoList panel="ongoing" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
};

export default TodoPage;
