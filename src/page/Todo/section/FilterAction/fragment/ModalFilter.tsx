//import react hooks
import { useEffect, useState } from "react";

//import library UI
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Divider,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  HStack,
  Button,
  Flex,
  Input,
  ModalFooter,
  useToast,
  Tag,
  Text,
} from "@chakra-ui/react";

//import styling
import {
  backgroundContainerCardColor,
  buttonMonoHoverStyle,
  textColor,
} from "../../../../../component/style";

//import useAppSelector from redux store
import { AppDispatch, useAppSelector } from "../../../../../redux/store";

//import dispatch for redux
import { useDispatch } from "react-redux";

//import action reducer from redux
import { setFilter } from "../../../../../redux/slices/todoSlice";

//import data type
import { filterType } from "../../../../../type";

//import initial data state
import { initialFilterState, priorityTagMap } from "../../../../../util/data";

//import useSearchParams react-router
import { useSearchParams } from "react-router-dom";

function ModalFilter({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { filter } = useAppSelector((state) => state.todo);
  const [selectedFilters, setSelectedFilters] = useState<filterType>(
    filter ? filter : initialFilterState
  );
  const { priorities, categories } = useAppSelector((state) => state.todo);
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  //track redux filter state change
  useEffect(() => {
    if (filter) {
      setSelectedFilters(filter);
    }
  }, [filter]);

  //assign global data priorities & categories
  const filterOptions = {
    priorities: priorities && priorities,
    categories: categories && categories,
    from_date: "",
    to_date: "",
  };

  //handle selected filter option
  const handleFilterClick = (key: string, value: string) => {
    if (key === "priorities" || key === "categories") {
      setSelectedFilters((prevFilters: filterType) => {
        if (prevFilters[key].includes(value)) {
          return {
            ...prevFilters,
            [key]: prevFilters[key].filter((item) => item !== value),
          };
        } else {
          return {
            ...prevFilters,
            [key]: [...prevFilters[key], value],
          };
        }
      });
    }
  };

  //handle date input filter
  const handleDateFilter = () => {
    if (selectedFilters.from_date || selectedFilters.to_date) {
      if (selectedFilters.from_date && selectedFilters.to_date) {
        if (selectedFilters.from_date > selectedFilters.to_date) {
          toast({
            title: "From date cant be greater than To date!",
            status: "warning",
            isClosable: true,
            position: "top-right",
          });
          return;
        } else {
          return true;
        }
      } else {
        toast({
          title: "Please fill both from date and to date!",
          status: "warning",
          isClosable: true,
          position: "top-right",
        });
        return;
      }
    }
    if (!selectedFilters.from_date && !selectedFilters.to_date) {
      return true;
    }
  };

  //handle set url searchParams based on selectedFilters
  const handleSetURLSearchParams = (key: string) => {
    if (selectedFilters[key as keyof filterType].length > 0) {
      setSearchParams((prev) => {
        const value = Array.isArray(selectedFilters[key as keyof filterType])
          ? (selectedFilters[key as keyof filterType] as string[]).join(",")
          : (selectedFilters[key as keyof filterType] as string);

        prev.set(key, value);
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.delete(key);
        return prev;
      });
    }
  };

  //handle submit filter
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const isDateFilterValid = handleDateFilter();
    if (isDateFilterValid) {
      handleSetURLSearchParams("categories");
      handleSetURLSearchParams("priorities");
      handleSetURLSearchParams("from_date");
      handleSetURLSearchParams("to_date");
      dispatch(setFilter(selectedFilters));
      toast({
        title: "Filter applied!",
        status: "success",
        isClosable: true,
        position: "top-right",
      });
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg={backgroundContainerCardColor()}
        color={textColor()}
        rounded={"3xl"}
        p={4}
      >
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            Filter
            <Divider mt={4} borderColor={textColor()} />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <Text mb={2}>Priority</Text>
              <HStack gap={2}>
                {filterOptions.priorities &&
                  filterOptions.priorities.map((option) => (
                    <Tag
                      key={option}
                      variant={
                        selectedFilters.priorities.includes(option)
                          ? `${priorityTagMap.get(option)}`
                          : `${priorityTagMap.get(option)}Outline`
                      }
                      fontSize={"xs"}
                      onClick={() => handleFilterClick("priorities", option)}
                      cursor={"pointer"}
                    >
                      {option}
                    </Tag>
                  ))}
              </HStack>
            </FormControl>
            <FormControl mb={4}>
              <Text mb={2}>Category</Text>
              <Flex flexWrap={"wrap"} gap={2}>
                {filterOptions.categories &&
                  filterOptions.categories.map((option) => (
                    <Tag
                      key={option}
                      variant={
                        selectedFilters.categories.includes(option)
                          ? `primary`
                          : `primaryOutline`
                      }
                      fontSize={"xs"}
                      onClick={() => handleFilterClick("categories", option)}
                      cursor={"pointer"}
                    >
                      {option}
                    </Tag>
                  ))}
              </Flex>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>From</FormLabel>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="date"
                name="from_date"
                borderColor={textColor()}
                onChange={(e) =>
                  setSelectedFilters((prevFilter: filterType) => ({
                    ...prevFilter,
                    [e.target.name]: e.target.value,
                  }))
                }
                value={selectedFilters.from_date}
              />
            </FormControl>
            <FormControl>
              <FormLabel>To</FormLabel>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="date"
                name="to_date"
                borderColor={textColor()}
                onChange={(e) =>
                  setSelectedFilters((prevFilter: filterType) => ({
                    ...prevFilter,
                    [e.target.name]: e.target.value,
                  }))
                }
                value={selectedFilters.to_date}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter
            justifyContent={"space-between"}
            alignItems={"center"}
            mt={4}
          >
            <Button
              onClick={() => setSelectedFilters(initialFilterState)}
              border={"1px"}
              bg={"transparent"}
              color={textColor()}
              borderColor={textColor()}
              _hover={buttonMonoHoverStyle()}
            >
              Clear
            </Button>
            <Button colorScheme="purple" type="submit">
              Apply
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default ModalFilter;
