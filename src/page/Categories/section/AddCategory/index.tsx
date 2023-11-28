//import library UI
import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

//import styling
import {
  backgroundContainerCardColor,
  buttonMonoHoverStyle,
  inputFocusBorder,
  primaryColor,
  textColor,
} from "../../../../component/style";

//import icon
import { AddIcon } from "@chakra-ui/icons";

//import react hooks
import React, { useState } from "react";

//import dispatch & selector redux
import { AppDispatch, useAppSelector } from "../../../../redux/store";
import { useDispatch } from "react-redux";

//import action reducer from redux
import { addCategory } from "../../../../redux/slices/todoSlice";

const AddCategory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newCategory, setNewCategory] = useState<string>("");
  const { categories } = useAppSelector((state) => state.todo);
  const toast = useToast();
  const dispatch = useDispatch<AppDispatch>();

  //fungsi handle submit add category
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newCategory) {
      if (categories) {
        if (categories.includes(newCategory)) {
          toast({
            title: `Category is already available`,
            status: "error",
            position: "top-right",
            isClosable: true,
          });
        } else {
          dispatch(addCategory(newCategory));
          toast({
            title: `Success adding new category!`,
            status: "success",
            position: "top-right",
            isClosable: true,
          });
          onClose();
        }
      }
    }
  };

  return (
    <>
      <Stack
        bg={backgroundContainerCardColor()}
        p={6}
        rounded={"xl"}
        minW={"200px"}
        color={primaryColor()}
        mb={4}
        cursor={"pointer"}
        justifyContent={"center"}
        align={"center"}
        opacity={0.5}
        _hover={{ opacity: 1 }}
        onClick={onOpen}
      >
        <AddIcon fontSize={"xl"} />
        <Text fontSize={"lg"} textAlign={"center"} py={4}>
          Add Category
        </Text>
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent bg={backgroundContainerCardColor()} color={textColor()}>
          <form onSubmit={handleSubmit}>
            <ModalHeader>New Category</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <Input
                  borderColor={textColor()}
                  _placeholder={{ color: "inherit", opacity: 0.5 }}
                  focusBorderColor={inputFocusBorder()}
                  placeholder="write category"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter justifyContent={"space-between"}>
              <Button
                border={"1px"}
                bg={"transparent"}
                color={textColor()}
                borderColor={textColor()}
                _hover={buttonMonoHoverStyle()}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button colorScheme="purple" type="submit">
                Add
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddCategory;
