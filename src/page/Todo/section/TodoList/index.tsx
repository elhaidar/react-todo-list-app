//import library UI
import { Flex, SimpleGrid, Stack, Text } from "@chakra-ui/react";

//import react hooks
import { useContext, useEffect, useMemo, useState } from "react";

//import selector redux
import { AppDispatch, useAppSelector } from "../../../../redux/store";

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
} from "../../../../util/sort";

//import initial data
import { initialFilterState } from "../../../../util/data";

//import theme context
import { ThemeContext } from "../../../../App";

//import Pagination component
import Pagination from "../../../../component/Pagination";

//import useSearchParams react-router
import { useSearchParams } from "react-router-dom";

//import dispatch redux
import { useDispatch } from "react-redux";

//import action reducer redux
import { setFilter } from "../../../../redux/slices/todoSlice";

//import data type
import { filterType } from "../../../../type";

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
  const [searchParams, setSearchParams] = useSearchParams();

  interface FilterParamsProp {
    categories: string[];
    priorities: string[];
    from_date: string | null;
    to_date: string | null;
  }

  //variable for URL searchParams (?categories= & ?priorities=)
  const filterParams: FilterParamsProp = {
    categories: searchParams.getAll("categories"),
    priorities: searchParams.getAll("priorities"),
    from_date: searchParams.get("from_date"),
    to_date: searchParams.get("to_date"),
  };

  const dispatch = useDispatch<AppDispatch>();

  //check url searchParams and setSearchParams based on filterParams[key]
  const checkFilterParams = (key: string) => {
    const paramValue = filterParams[key as keyof filterType];
    if (Array.isArray(paramValue)) {
      // Handle the case where filterParams[key] is an array
      if (paramValue.length > 0 && paramValue[0] !== "") {
        setSearchParams((prev) => {
          prev.set(key, paramValue.join(" , "));
          return prev;
        });

        dispatch(
          setFilter({
            ...filter,
            [key]: paramValue[0].split(","),
          })
        );
      } else {
        setSearchParams((prev) => {
          prev.delete(key);
          return prev;
        });
      }
    } else {
      // Handle the case where filterParams[key] is a string
      if (paramValue && paramValue !== "") {
        setSearchParams((prev) => {
          prev.set(key, paramValue);
          return prev;
        });
        dispatch(
          setFilter({
            ...filter,
            [key]: paramValue,
          })
        );
      } else {
        setSearchParams((prev) => {
          prev.delete(key);
          return prev;
        });
      }
    }
  };

  //check url searchParams when user change it
  useEffect(() => {
    checkFilterParams("categories");
    checkFilterParams("priorities");
    checkFilterParams("from_date");
    checkFilterParams("to_date");
  }, []);

  //set or delete URL categories filter param based on filter state
  useEffect(() => {
    filter.categories &&
      filter.categories.length > 0 &&
      setSearchParams((prev) => {
        prev.set("categories", filter.categories.join(","));
        return prev;
      });
    if (filter.categories[0] === "" || !filter.categories) {
      filter.categories.length === 0 &&
        setSearchParams((prev) => {
          prev.delete("categories");
          return prev;
        });
    }
  }, [filter.categories]);

  //set or delete URL priorities filter param based on filter state
  useEffect(() => {
    filter.priorities &&
      filter.priorities.length > 0 &&
      setSearchParams((prev) => {
        prev.set("priorities", filter.priorities.join(","));
        return prev;
      });
    if (filter.priorities[0] === "" || !filter.priorities) {
      filter.priorities.length === 0 &&
        setSearchParams((prev) => {
          prev.delete("priorities");
          return prev;
        });
    }
  }, [filter.priorities]);

  //set or delete URL from_date filter param based on filter state
  useEffect(() => {
    setSearchParams((prev) => {
      prev.set("from_date", filter.from_date);
      return prev;
    });
    if (filter.from_date === "" || !filter.from_date) {
      setSearchParams((prev) => {
        prev.delete("from_date");
        return prev;
      });
    }
  }, [filter.from_date]);

  //set or delete URL to_date filter param based on filter state
  useEffect(() => {
    if (filter.to_date) {
      setSearchParams((prev) => {
        prev.set("to_date", filter.to_date);
        return prev;
      });
    }
    if (filter.to_date === "" || !filter.to_date) {
      setSearchParams((prev) => {
        prev.delete("to_date");
        return prev;
      });
    }
  }, [filter.to_date]);

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
          <Flex justify={"space-between"} align={"center"} py={4}>
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
          columns={{ base: 1, sm: 2, md: 3 }}
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
            columns={{ base: 1, sm: 2, md: 3 }}
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
