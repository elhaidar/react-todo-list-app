/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalContent,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
//import styling dari component/style.ts
import {
  backgroundContainerCardColor,
  buttonMonoHoverStyle,
  cardBackgroundColor,
  inputFocusBorder,
  scrollBarStyleSx,
  textColor,
} from "../style";
import { AddIcon, ChevronDownIcon, EditIcon } from "@chakra-ui/icons";
//import data type dari type/index.ts
import { todoType } from "../../type";
//import useAppSelector dari redux
import { AppDispatch, useAppSelector } from "../../redux/store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
//import initial data state
import { initialTodoItemState } from "../../util/data";
//import action reducer dari redux
import { addCategory, addTodo, editTodo } from "../../redux/slices/todoSlice";
//import util func getDate
import getDate from "../../util/getDateNow";
import { v4 as uuidv4 } from "uuid";

const CustomForm = ({
  title, //props for heading form
  isOpen, //props for open modal component from useDisclosure hooks chakra ui
  onClose, //props for close modal component from useDisclosure hooks chakra ui,
  id, //props todo id
  categorySelected,
  dateSelected,
}: {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  id?: string;
  categorySelected?: string;
  dateSelected?: string;
}) => {
  //get data categories from redux
  const { categories }: { categories: string[] } = useAppSelector(
    (state) => state.todo
  );
  const { todo }: { todo: todoType[] } = useAppSelector((state) => state.todo);
  const dispatch = useDispatch<AppDispatch>();

  //state for save data todoItem
  const [todoItem, setTodoItem] = useState<todoType>(initialTodoItemState);
  const [inputCategory, setInputCategory] = useState<string>("");
  const [isDateChange, setIsDateChange] = useState<boolean>(false);
  const [dataCategories, setDataCategories] = useState<string[]>([]);
  const uniqueId = uuidv4();
  const toast = useToast();

  //set local state categories
  useEffect(() => {
    if (categories && categories.length > 0 && dataCategories.length === 0) {
      setDataCategories(categories);
    }
  }, [categories, dataCategories]);

  //for tracking todo state and set searchedTodo to todoItem
  useEffect(() => {
    if (id && todo) {
      const searchedTodo = todo.find((item) => item.id === id);
      searchedTodo && setTodoItem(searchedTodo);
    }
  }, [id, todo]);

  //function for handle onClose modal
  const handleOnClose = () => {
    onClose();
  };

  //function for submit form
  const onSubmit = (e: any) => {
    e.preventDefault();
    //branching to handle logic create todo
    if (title === "Add Todo") {
      const newTodo: todoType = {
        ...todoItem,
        id: uniqueId,
        completed: false,
        category: categorySelected ? categorySelected : todoItem.category,
        date: dateSelected
          ? isDateChange
            ? todoItem.date
            : dateSelected
          : todoItem.date
          ? todoItem.date
          : getDate(),
      };

      //add new category
      if (
        categories &&
        !categories.includes(dataCategories[dataCategories.length - 1])
      ) {
        dispatch(addCategory(dataCategories[dataCategories.length - 1]));
      }

      dispatch(addTodo(newTodo));
      toast({
        title: `Success ${title}`,
        status: "success",
        position: "top-right",
        isClosable: true,
      });

      //reset to initial data
      setTodoItem(initialTodoItemState);
    }

    //branching for handle logic submit edit todo
    else if (title === "Edit Todo") {
      const newTodo: todoType = {
        ...todoItem,
      };
      setTodoItem(newTodo);
      dispatch(editTodo(newTodo));
      toast({
        title: `Success ${title}`,
        status: "success",
        position: "top-right",
        isClosable: true,
      });
    }
    onClose();
  };

  //handle submit add category
  const handleSubmitInputCategory = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inputCategory) {
      if (!dataCategories.includes(inputCategory)) {
        setDataCategories([...dataCategories, inputCategory]);
        setInputCategory("");
      } else {
        toast({
          title: `Category is already available`,
          status: "error",
          position: "top-right",
          isClosable: true,
        });
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose}>
      <ModalOverlay />
      <ModalContent w={"100%"} maxW={"500px"} rounded={"3xl"}>
        <Stack
          w={"100%"}
          bg={backgroundContainerCardColor()}
          p={8}
          rounded={"3xl"}
          color={textColor()}
        >
          <Heading textAlign={"center"} fontSize={"3xl"} mb={2}>
            {title}
          </Heading>
          <Stack as={"form"} onSubmit={onSubmit} w={"100%"}>
            <FormControl id="title" isRequired mb={2}>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                placeholder="Healing ke Ubud"
                _placeholder={{ color: "inherit", opacity: 0.5 }}
                focusBorderColor={inputFocusBorder()}
                rounded={"3xl"}
                borderColor={textColor()}
                onChange={(e) =>
                  setTodoItem({ ...todoItem, title: e.target.value })
                }
                value={todoItem.title}
              />
            </FormControl>
            <FormControl id="description" isRequired mb={2}>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea
                placeholder="lorem ipsum dolor si amet"
                rounded={"3xl"}
                _placeholder={{ color: "inherit", opacity: 0.5 }}
                focusBorderColor={inputFocusBorder()}
                borderColor={textColor()}
                onChange={(e) =>
                  setTodoItem({
                    ...todoItem,
                    description: e.target.value,
                  })
                }
                value={todoItem.description}
              />
            </FormControl>
            <FormControl id="priority" mb={2} isRequired>
              <FormLabel htmlFor={todoItem.priority}>Priority</FormLabel>
              <RadioGroup
                display={"flex"}
                gap={4}
                onChange={(value) =>
                  setTodoItem({ ...todoItem, priority: value })
                }
                value={todoItem.priority}
              >
                <Radio
                  value="tinggi"
                  colorScheme={"red"}
                  borderColor={textColor()}
                  id="tinggi"
                >
                  Tinggi
                </Radio>
                <Radio
                  value="sedang"
                  colorScheme="yellow"
                  borderColor={textColor()}
                  id="sedang"
                >
                  Sedang
                </Radio>
                <Radio
                  value="rendah"
                  colorScheme={"purple"}
                  borderColor={textColor()}
                  id="rendah"
                >
                  Rendah
                </Radio>
              </RadioGroup>
            </FormControl>
            <FormControl id="date" mb={2} isRequired>
              <FormLabel htmlFor="date">Date</FormLabel>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="date"
                borderColor={textColor()}
                onChange={(e) => {
                  setTodoItem({ ...todoItem, date: e.target.value });
                  setIsDateChange(true);
                }}
                defaultValue={
                  dateSelected
                    ? dateSelected
                    : todoItem.date
                    ? todoItem.date
                    : getDate()
                }
              />
            </FormControl>

            <FormControl id="category" isRequired>
              <FormLabel htmlFor="category">Category</FormLabel>
              <Menu boundary={"scrollParent"}>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  variant={"outline"}
                  color={textColor()}
                  borderColor={textColor()}
                  _hover={buttonMonoHoverStyle()}
                  w={"100%"}
                  textAlign={"left"}
                  fontWeight={"normal"}
                  _active={buttonMonoHoverStyle()}
                  isDisabled={categorySelected ? true : false}
                >
                  {categorySelected ? categorySelected : todoItem.category}
                </MenuButton>
                <MenuList
                  color={textColor()}
                  borderColor={textColor()}
                  bg={cardBackgroundColor()}
                  minW={"440px"}
                  w={"100%"}
                  overflowY={"auto"}
                  maxHeight={"200px"}
                  sx={scrollBarStyleSx()}
                >
                  {dataCategories &&
                    dataCategories.map((cat) => (
                      <MenuItem
                        key={cat}
                        bg={"transparent"}
                        _hover={buttonMonoHoverStyle()}
                        w={"100%"}
                        onClick={() =>
                          setTodoItem({
                            ...todoItem,
                            category: cat,
                          })
                        }
                      >
                        {cat}
                      </MenuItem>
                    ))}
                  <HStack px={3} mt={2} w={"100%"}>
                    <Input
                      color={textColor()}
                      borderColor={textColor()}
                      w="100%"
                      placeholder="write category"
                      _focus={{ borderColor: textColor() }}
                      _hover={{ borderColor: textColor() }}
                      onChange={(e) => {
                        setInputCategory(e.target.value);
                      }}
                      autoComplete="off"
                      value={inputCategory}
                      isRequired={false}
                    />
                    <Button
                      leftIcon={<AddIcon />}
                      bg={"transparent"}
                      color={textColor()}
                      _hover={buttonMonoHoverStyle()}
                      cursor={"pointer"}
                      fontWeight={"normal"}
                      onClick={handleSubmitInputCategory}
                    >
                      Add
                    </Button>
                  </HStack>
                </MenuList>
              </Menu>
            </FormControl>

            <Button
              aria-label="add_todo_button"
              leftIcon={id ? <EditIcon /> : <AddIcon />}
              rounded={"full"}
              type="submit"
              color={textColor()}
              borderColor={textColor()}
              _hover={buttonMonoHoverStyle()}
              mt={8}
              variant={"outline"}
            >
              {title}
            </Button>
          </Stack>
        </Stack>
      </ModalContent>
    </Modal>
  );
};

export default CustomForm;
