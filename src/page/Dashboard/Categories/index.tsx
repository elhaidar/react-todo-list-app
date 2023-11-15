import {
  Card,
  CardBody,
  Flex,
  HStack,
  Heading,
  Icon,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
//import category card component
import CategoryCard from "./section/CategoryCard";
import { useAppSelector } from "../../../redux/store";
//import todo item card component
import TodoItem from "../../../component/TodoItem";
//import styling
import {
  backgroundContainerCardColor,
  cardBackgroundColor,
  cardOpacity,
  cardVagueTextColor,
  primaryColor,
  scrollBarPrimaryStyleSx,
} from "../../../component/style";
import { useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
//import custom modal form component
import CustomForm from "../../../component/Form";
import { BiCategoryAlt } from "react-icons/bi";
//import add category component
import AddCategory from "./section/AddCategory";

const CategoriesPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { todo, categories } = useAppSelector((state) => state.todo);
  const [categorySelected, setCategorySelected] = useState<string>(
    categories ? categories[0] : ""
  );

  return (
    <Stack w={"100%"} px={12}>
      <Heading
        color={primaryColor()}
        display={"flex"}
        alignItems={"center"}
        gap={4}
        mb={4}
      >
        Categories <Icon as={BiCategoryAlt} />
      </Heading>

      <Flex
        direction={"column"}
        align={"center"}
        justifyItems={"center"}
        w={"100%"}
      >
        <Flex mb={8} w={"100%"}>
          <Flex
            gap={8}
            overflowX={"auto"}
            minH={"200px"}
            w={"100%"}
            maxW={"100%"}
            sx={scrollBarPrimaryStyleSx()}
          >
            {categories &&
              categorySelected &&
              categories.map((item) => (
                <CategoryCard
                  key={item}
                  selected={categorySelected}
                  category={item}
                  onClick={() => setCategorySelected(item)}
                />
              ))}
            <AddCategory />
          </Flex>
        </Flex>
        <Stack
          w={"100%"}
          bg={backgroundContainerCardColor()}
          p={8}
          rounded={"3xl"}
        >
          <Heading fontSize={"2xl"} color={primaryColor()} mb={4}>
            Task {categorySelected && categorySelected}
          </Heading>
          <Flex
            flexWrap={"wrap"}
            gap={8}
            justify={"flex-start"}
            alignContent={"flex-start"}
          >
            {todo &&
              categorySelected &&
              todo
                .filter((item) => item.category === categorySelected)
                .map((item) => (
                  <TodoItem
                    key={item.id} // Ensure 'item.id' is unique
                    todo={item}
                    isExpandAll={false}
                    maxW="45%"
                    size="18px"
                    buttonGap="8px"
                  />
                ))}
            <Card
              minW={"45%"}
              maxW={"50%"}
              bg={cardBackgroundColor()}
              opacity={cardOpacity()}
              color={cardVagueTextColor()}
              _hover={{ opacity: 1 }}
              cursor={"pointer"}
              boxShadow={"lg"}
              onClick={onOpen}
              h={"min-content"}
            >
              <CardBody alignItems={"center"} justifyContent={"center"}>
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
          </Flex>
        </Stack>
        <CustomForm
          title="Add Todo"
          categorySelected={categorySelected}
          isOpen={isOpen}
          onClose={onClose}
        />
      </Flex>
    </Stack>
  );
};

export default CategoriesPage;
