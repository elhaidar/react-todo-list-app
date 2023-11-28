/* eslint-disable @typescript-eslint/no-unused-vars */
//import library UI
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  HStack,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";

//import styling
import {
  backgroundContainerCardColor,
  categoryTagFontSize,
  primaryColor,
  textColor,
} from "../../../../../../component/style";

//import data type
import { todoType } from "../../../../../../type";

//import action button
import EditAction from "../../../../../../component/TodoItem/section/EditAction";
import DeleteAction from "../../../../../../component/TodoItem/section/DeleteAction";

const TimelineTodoItem = ({
  isChecked,
  todoItem,
}: {
  isChecked: boolean;
  todoItem: todoType;
}) => {
  return (
    <Accordion allowMultiple w={"100%"}>
      <AccordionItem
        borderY={"none"}
        borderColor={textColor()}
        mb={4}
        color={isChecked ? "white" : textColor()}
        bg={isChecked ? "green.500" : backgroundContainerCardColor()}
        py={4}
        rounded={"3xl"}
        boxShadow={"md"}
      >
        <AccordionButton
          p={0}
          px={{ base: 4, lg: 6 }}
          w={"100%"}
          _hover={{ background: "transparent" }}
        >
          <Stack
            flexDirection={{ base: "column", md: "row" }}
            justify={"space-between"}
            fontSize={{ base: "sm", md: "md" }}
            align={{ base: "flex-start", md: "center" }}
            w={"100%"}
          >
            <Text as={isChecked ? "s" : "p"} textAlign={"left"} w={"100%"}>
              {todoItem.title}
            </Text>
            <HStack
              align={"center"}
              justify={"space-between"}
              w={{ base: "100%", md: "min-content" }}
            >
              <HStack>
                <Tag
                  size={"sm"}
                  variant={
                    todoItem.priority === "tinggi"
                      ? "danger"
                      : todoItem.priority === "sedang"
                      ? "warning"
                      : "primary"
                  }
                  fontSize={categoryTagFontSize()}
                >
                  {todoItem.priority}
                </Tag>
                <Tag
                  size={"sm"}
                  variant="primary"
                  fontSize={categoryTagFontSize()}
                >
                  #{todoItem.category}
                </Tag>
              </HStack>
              <AccordionIcon
                ml={{ lg: 8 }}
                color={isChecked ? "white" : primaryColor()}
              />
            </HStack>
          </Stack>
        </AccordionButton>
        <AccordionPanel
          px={{ base: 4, lg: 6 }}
          pt={4}
          pb={2}
          w={"100%"}
          fontSize={"xs"}
        >
          <Text opacity={0.7}>Description</Text>
          <Stack
            flexDirection={{ base: "column", md: "row" }}
            w={"100%"}
            justifyContent={"space-between"}
            align={"flex-end"}
            gap={4}
          >
            <Text>{todoItem.description}</Text>
            <HStack gap={3} ml={4}>
              <EditAction color="gray.50" data={todoItem} size="18px" />
              <DeleteAction color="gray.50" todo={todoItem} size="18px" />
            </HStack>
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default TimelineTodoItem;
