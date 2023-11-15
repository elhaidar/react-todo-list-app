/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchIcon } from "@chakra-ui/icons";
import { Flex, FormControl, Input, InputGroup, Stack } from "@chakra-ui/react";
import { AppDispatch, useAppSelector } from "../../../../../redux/store";
import { useDispatch } from "react-redux";
//import reducer action from todoSlice redux
import { setSearch } from "../../../../../redux/slices/todoSlice";
//import styling
import { backgroundContainerCardColor } from "../../../../../component/style";

const Search = () => {
  //get state from redux
  const { search } = useAppSelector((state) => state.todo);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Flex w={"100%"} mb={4}>
      <Stack w={"100%"}>
        <form>
          <FormControl
            id="search"
            bg={backgroundContainerCardColor()}
            rounded={"xl"}
            p={2}
          >
            <InputGroup display={"flex"} alignItems={"center"}>
              <Stack ml={2} px={2}>
                <SearchIcon opacity={0.5} />
              </Stack>
              <Input
                name="search"
                placeholder="Search here..."
                onChange={(e: any) => dispatch(setSearch(e.target.value))}
                value={search}
                autoComplete="off"
                borderColor={"transparent"}
                _hover={{ borderColor: "transparent" }}
                focusBorderColor="transparent"
                border={"none"}
              />
            </InputGroup>
          </FormControl>
        </form>
      </Stack>
    </Flex>
  );
};

export default Search;
