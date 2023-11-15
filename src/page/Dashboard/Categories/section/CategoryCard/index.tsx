import {
  CircularProgress,
  CircularProgressLabel,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
//import styling
import {
  backgroundContainerCardColor,
  primaryColor,
  trackProgressColor,
} from "../../../../../component/style";
import { useAppSelector } from "../../../../../redux/store";
import { useEffect, useMemo, useState } from "react";

const CategoryCard = ({
  category,
  selected,
  onClick,
}: {
  category: string;
  selected: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}) => {
  const { todo } = useAppSelector((state) => state.todo);
  const [filteredTodoByCategory, setFilteredTodoByCategory] = useState<{
    totalTodo: number;
    totalCompletedTodo: number;
  }>({
    totalTodo: 0,
    totalCompletedTodo: 0,
  });
  //perhitungan persentase progress category
  const percentageMemo = useMemo(() => {
    const percentage =
      (filteredTodoByCategory.totalCompletedTodo /
        filteredTodoByCategory.totalTodo) *
      100;
    return percentage;
  }, [filteredTodoByCategory]);

  //track jumlah completed todo & jumlah keseluruhan todo pada category
  useEffect(() => {
    if (todo) {
      const filterByCategory = todo.filter(
        (item) => item.category === category
      );
      const filterCompletedByCategory = filterByCategory.filter(
        (item) => item.completed === true
      );
      setFilteredTodoByCategory({
        totalTodo: filterByCategory.length,
        totalCompletedTodo: filterCompletedByCategory.length,
      });
    }
  }, [category, todo]);

  return (
    <Stack
      bg={
        selected === category ? primaryColor() : backgroundContainerCardColor()
      }
      p={6}
      rounded={"xl"}
      minW={"25%"}
      color={selected === category ? "white" : primaryColor()}
      mb={4}
      cursor={"pointer"}
      onClick={onClick}
    >
      <Heading as={"h3"} fontSize={"xl"} textAlign={"left"}>
        {category}
      </Heading>
      <Text opacity={"0.7"}>
        {filteredTodoByCategory.totalCompletedTodo}/
        {filteredTodoByCategory.totalTodo} Completed
      </Text>
      <Stack justify={"center"} align={"center"} py={2}>
        <CircularProgress
          value={percentageMemo ? percentageMemo : 0}
          color={selected === category ? "purple.700" : primaryColor()}
          size={"70px"}
          trackColor={selected === category ? "white" : trackProgressColor()}
        >
          <CircularProgressLabel opacity={"1"} fontSize={"sm"}>
            {percentageMemo ? percentageMemo.toFixed(0) : 0}%
          </CircularProgressLabel>
        </CircularProgress>
      </Stack>
    </Stack>
  );
};

export default CategoryCard;
