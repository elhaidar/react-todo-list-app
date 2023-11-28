//import library UI
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

//import selector redux
import { useAppSelector } from "../../redux/store";

//import todo item card component
import TodoItem from "../../component/TodoItem";

//import styling
import {
  backgroundContainerCardColor,
  cardBackgroundColor,
  cardOpacity,
  cardVagueTextColor,
  primaryColor,
  scrollBarPrimaryStyleSx,
} from "../../component/style";

//import react hooks
import { useState } from "react";

//import icon
import { AddIcon } from "@chakra-ui/icons";
import { BiCategoryAlt } from "react-icons/bi";

//import custom modal form component
import CustomForm from "../../component/Form";

//import add category component
import AddCategory from "./section/AddCategory";

const CategoriesPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { todo, categories } = useAppSelector((state) => state.todo);
  const [categorySelected, setCategorySelected] = useState<string>(
    categories ? categories[0] : ""
  );

  return (
    <Stack w={"100%"} pb={"32px"} maxW={"900px"}>
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
            gap={{ base: 4, lg: 8 }}
            overflowX={"auto"}
            minH={"200px"}
            w={"100%"}
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
          bg={{ base: "transparent", lg: backgroundContainerCardColor() }}
          p={{ lg: 8 }}
          rounded={"3xl"}
        >
          <Heading fontSize={"2xl"} color={primaryColor()} mb={4}>
            Task {categorySelected && categorySelected}
          </Heading>
          <Flex
            flexWrap={"wrap"}
            gap={{ base: 4, lg: 8 }}
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
                    maxW={{ base: "100%", sm: "45%" }}
                    size="18px"
                    buttonGap="8px"
                  />
                ))}
            <Card
              minW={{ base: "100%", sm: "45%" }}
              maxW={{ base: "100%", sm: "45%" }}
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
