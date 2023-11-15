import { Flex, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useContext, useMemo, useState } from "react";
import { useAppSelector } from "../../../../../redux/store";
//import todo card component
import TodoCard from "./section/TodoCard";
//import add todo card component
import AddTodoCard from "./section/AddTodoCard";
//import sort func util
import {
  compareByAlphabetAsc,
  compareByAlphabetDesc,
  compareByCompletedAsc,
  compareByCompletedDesc,
  compareByDateAsc,
  compareByDateDesc,
  compareByPriorityAsc,
  compareByPriorityDesc,
} from "../../../../../util/sort";
//import initial data
import { initialFilterState } from "../../../../../util/data";
import { ThemeContext } from "../../../../../App";
import Pagination from "../../../../../component/Pagination";

const pageSize = 8;

const TodoList = ({
  panel,
  hideInfo = false,
}: {
  panel: string;
  hideInfo?: boolean;
}) => {
  const { todo, search, filter, sort } = useAppSelector((state) => state.todo);
  const theme: any = useContext(ThemeContext);
  const [currentPage, setCurrentPage] = useState<number>(1);

  //handle todo by search & filter
  const filteredTodo = useMemo(() => {
    if (!search && filter === initialFilterState) {
      return todo;
    }

    const filteredBySearch = todo.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );

    if (filter !== initialFilterState) {
      const filteredPriority =
        filter.priorities.length === 0
          ? filteredBySearch
          : filteredBySearch.filter((item) =>
              filter.priorities.includes(item.priority)
            );
      const filteredCategory =
        filter.categories.length === 0
          ? filteredPriority
          : filteredPriority.filter((item) =>
              filter.categories.includes(item.category)
            );
      const filteredRangeDate =
        filter.from_date && filter.to_date
          ? filteredCategory.filter(
              (item) =>
                item.date >= filter.from_date && item.date <= filter.to_date
            )
          : filteredCategory;

      return filteredRangeDate;
    }

    return filteredBySearch;
  }, [search, filter, todo]);

  //handle todo by sort
  const sortedTodo = useMemo(() => {
    if (filteredTodo && filteredTodo.length > 0) {
      const dataTodo = [...filteredTodo];
      if (sort) {
        let sortedData: any[] = [];
        if (sort.sortBy === "date") {
          sortedData = dataTodo
            .slice()
            .sort(sort.order === "asc" ? compareByDateAsc : compareByDateDesc);
        } else if (sort.sortBy === "priority") {
          sortedData = dataTodo
            .slice()
            .sort(
              sort.order === "asc"
                ? compareByPriorityAsc
                : compareByPriorityDesc
            );
        } else if (sort.sortBy === "title" || sort.sortBy === "category") {
          sortedData = dataTodo.slice().sort((a, b) => {
            if (sort.order === "asc") {
              return compareByAlphabetAsc(a, b, sort.sortBy) || 0;
            } else {
              return compareByAlphabetDesc(a, b, sort.sortBy) || 0;
            }
          });
        } else if (sort.sortBy === "completed") {
          sortedData = dataTodo
            .slice()
            .sort(
              sort.order === "asc"
                ? compareByCompletedAsc
                : compareByCompletedDesc
            );
        }
        return sortedData;
      }
    }
    return [];
  }, [filteredTodo, sort]);

  //for displaying todo
  const displayedTodo = useMemo(() => {
    return sortedTodo.length > 0 ? sortedTodo : filteredTodo;
  }, [filteredTodo, sortedTodo]);

  const PanelTodolist = ({
    data,
    children,
    hideInfo,
  }: {
    data: number;
    children: React.ReactNode;
    hideInfo: boolean;
  }) => {
    return (
      <Stack w={"100%"}>
        {!hideInfo && (
          <Flex justify={"space-between"} align={"center"} pt={2} pb={4}>
            <Text
              fontSize={"sm"}
              opacity={"0.5"}
              fontWeight={"bold"}
              fontStyle={"italic"}
            >
              {data > 0 ? `Showing ${data} todo` : "No todo found"}
            </Text>
          </Flex>
        )}
        {children}
      </Stack>
    );
  };

  const renderedPanel = useMemo(() => {
    const statusPanel = panel === "completed";

    const filteredCompletedTodo =
      displayedTodo &&
      displayedTodo.filter((item) => item.completed === statusPanel);
    const filteredTodoLength = filteredCompletedTodo.length;
    {
      /* slice data for pagination */
    }
    const renderedNodes = filteredCompletedTodo
      .slice((currentPage - 1) * pageSize, currentPage * pageSize)
      .map((item) => <TodoCard key={item.id} todoItem={item} />);

    return (
      <PanelTodolist data={filteredTodoLength} hideInfo={hideInfo}>
        <SimpleGrid
          spacing={4}
          placeItems={"flex-start"}
          w={"100%"}
          columns={3}
        >
          {renderedNodes}
          <AddTodoCard />
        </SimpleGrid>
        <Pagination
          currentPage={currentPage}
          siblingCount={1}
          totalCount={filteredTodoLength}
          pageSize={pageSize}
          onPageChange={(page) =>
            typeof page !== "string" ? setCurrentPage(page) : null
          }
        />
      </PanelTodolist>
    );
  }, [theme, displayedTodo, hideInfo, panel, currentPage]);

  return (
    <Stack w={"100%"}>
      {panel === "all" && displayedTodo && (
        <PanelTodolist data={displayedTodo.length} hideInfo={hideInfo}>
          <SimpleGrid
            spacing={4}
            placeItems={"flex-start"}
            w={"100%"}
            columns={3}
          >
            {/* slice data for pagination */}
            {displayedTodo
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
              .map((item) => (
                <TodoCard key={item.id} todoItem={item} />
              ))}
            <AddTodoCard />
          </SimpleGrid>
          <Pagination
            currentPage={currentPage}
            siblingCount={1}
            totalCount={displayedTodo.length}
            pageSize={pageSize}
            onPageChange={(page) =>
              typeof page !== "string" ? setCurrentPage(page) : null
            }
          />
        </PanelTodolist>
      )}
      {(panel === "completed" || panel === "ongoing") &&
        todo &&
        todo.length > 0 &&
        renderedPanel}
    </Stack>
  );
};

export default TodoList;
