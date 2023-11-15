/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  HStack,
  Tag,
  Text,
} from "@chakra-ui/react";
//import styling
import {
  backgroundContainerCardColor,
  primaryColor,
  textColor,
} from "../../../../../../../component/style";
//import data type
import { todoType } from "../../../../../../../type";
//import action button
import EditAction from "../../../../../../../component/TodoItem/section/EditAction";
import DeleteAction from "../../../../../../../component/TodoItem/section/DeleteAction";

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
        pr={8}
        pl={6}
        rounded={"3xl"}
        boxShadow={"md"}
      >
        <AccordionButton
          p={0}
          w={"100%"}
          _hover={{ background: "transparent" }}
        >
          <HStack justify={"space-between"} align={"center"} w={"100%"}>
            <Text as={isChecked ? "s" : "p"} textAlign={"left"}>
              {todoItem.title}
            </Text>
            <HStack align={"center"}>
              <Tag
                size={"sm"}
                variant={
                  todoItem.priority === "tinggi"
                    ? "danger"
                    : todoItem.priority === "sedang"
                    ? "warning"
                    : "primary"
                }
              >
                {todoItem.priority}
              </Tag>
              <Tag size={"sm"} variant="primary">
                #{todoItem.category}
              </Tag>
              <AccordionIcon
                ml={8}
                color={isChecked ? "white" : primaryColor()}
              />
            </HStack>
          </HStack>
        </AccordionButton>
        <AccordionPanel px={0} pt={4} pb={2} w={"100%"} fontSize={"xs"}>
          <Text opacity={0.7}>Description</Text>
          <HStack
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
          </HStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default TimelineTodoItem;
