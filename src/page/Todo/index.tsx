//import library UI
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
import { primaryHoverStyle } from "../../component/style";

//import search component
import Search from "./section/Search";

//import action button component
import FilterAction from "./section/FilterAction";
import SortAction from "./section/SortAction";
import FileAction from "./section/FileAction";

//import todolist component
import TodoList from "./section/TodoList";

//import custom hooks
import useScreenSize from "../../hooks/useScreenSize";

//import MobilePanelMenu component
import MobilePanelMenu from "./section/MobilePanelMenu";

//import useSearchParams react-router
import { useSearchParams } from "react-router-dom";

//import react hooks
import { useEffect } from "react";

const TodoPage = () => {
  const screenSize = useScreenSize();
  const [filterParams, setFilterParams] = useSearchParams();
  const displayParams = filterParams.get("filter");

  //detect filter url param and setFilterParams
  useEffect(() => {
    displayParams &&
      setFilterParams((prev) => {
        prev.set("filter", displayParams);
        return prev;
      });
  }, []);

  return (
    <Stack w={"100%"} pb={"32px"}>
      <Search />
      <Tabs
        variant="soft-rounded"
        w={"100%"}
        defaultIndex={
          displayParams === "completed"
            ? 1
            : displayParams === "ongoing"
            ? 2
            : 0
        }
      >
        <TabList display={"flex"} justifyContent={"space-between"}>
          {screenSize.width > 992 && (
            <HStack>
              <Tab
                _selected={primaryHoverStyle()}
                _hover={primaryHoverStyle()}
                bg={"transparent"}
                onClick={() => {
                  setFilterParams((prev) => {
                    prev.delete("filter");
                    return prev;
                  });
                }}
              >
                All
              </Tab>
              <Tab
                _hover={primaryHoverStyle()}
                _selected={primaryHoverStyle()}
                bg={"transparent"}
                onClick={() =>
                  setFilterParams((prev) => {
                    prev.set("filter", "completed");
                    return prev;
                  })
                }
              >
                Completed
              </Tab>
              <Tab
                _hover={primaryHoverStyle()}
                _selected={primaryHoverStyle()}
                bg={"transparent"}
                onClick={() =>
                  setFilterParams((prev) => {
                    prev.set("filter", "ongoing");
                    return prev;
                  })
                }
              >
                Ongoing
              </Tab>
            </HStack>
          )}
          {screenSize.width < 992 && (
            <MobilePanelMenu
              setFilterParams={setFilterParams}
              displayParams={displayParams}
            />
          )}
          <HStack fontSize={{ base: "xs", md: "sm" }}>
            <FilterAction />
            <SortAction />
            <FileAction />
          </HStack>
        </TabList>
        <TabPanels>
          <TabPanel p={0}>
            {/* ALL */}
            <TodoList panel="all" />
          </TabPanel>
          <TabPanel p={0}>
            {/* Completed */}
            <TodoList panel="completed" />
          </TabPanel>
          <TabPanel p={0}>
            {/* Ongoing */}
            <TodoList panel="ongoing" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
};

export default TodoPage;
