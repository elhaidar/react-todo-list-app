/* eslint-disable @typescript-eslint/no-explicit-any */
//import icon
import { SearchIcon } from "@chakra-ui/icons";

//import library UI
import { Flex, FormControl, Input, InputGroup, Stack } from "@chakra-ui/react";

//import dispatch & selector redux
import { AppDispatch, useAppSelector } from "../../../../redux/store";
import { useDispatch } from "react-redux";

//import reducer action from todoSlice redux
import { setSearch } from "../../../../redux/slices/todoSlice";

//import styling
import { backgroundContainerCardColor } from "../../../../component/style";

//import useSearchParams react-router
import { useSearchParams } from "react-router-dom";

//import react hooks
import { useEffect } from "react";

const Search = () => {
  //get state from redux
  const { search } = useAppSelector((state) => state.todo);

  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  //detect search url param and setSearchParams
  useEffect(() => {
    if (searchQuery) {
      dispatch(setSearch(searchQuery));
      setSearchParams((prev) => {
        prev.set("search", searchQuery);
        return prev;
      });
    }
  }, []);

  //handle input search onchange
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    //input "" (empty) then delete search url param and dispatch setSearch
    if (text.length === 0) {
      setSearchParams((prev) => {
        prev.delete("search");
        return prev;
      });
      dispatch(setSearch(""));
    }

    //if there is input then setSearchParams and dispatch setSearch
    else {
      setSearchParams((prev) => {
        prev.set("search", text);
        return prev;
      });
      dispatch(setSearch(e.target.value));
    }
  };

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
                onChange={onSearchChange}
                value={search ?? ""}
                autoComplete="off"
                borderColor={"transparent"}
                _hover={{ borderColor: "transparent" }}
                focusBorderColor="transparent"
                border={"none"}
                fontSize={{ base: "sm", md: "md" }}
              />
            </InputGroup>
          </FormControl>
        </form>
      </Stack>
    </Flex>
  );
};

export default Search;
