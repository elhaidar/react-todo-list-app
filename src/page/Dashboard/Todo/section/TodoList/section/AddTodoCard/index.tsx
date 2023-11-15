import { AddIcon } from "@chakra-ui/icons";
import { Card, CardBody, HStack, Text, useDisclosure } from "@chakra-ui/react";
//import custom form component
import CustomForm from "../../../../../../../component/Form";
//import styling
import {
  backgroundContainerCardColor,
  cardOpacity,
  cardVagueTextColor,
} from "../../../../../../../component/style";

const AddTodoCard = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Card
        w={"100%"}
        bg={backgroundContainerCardColor()}
        minH={"220px"}
        opacity={cardOpacity()}
        color={cardVagueTextColor()}
        _hover={{ opacity: 1 }}
        cursor={"pointer"}
        boxShadow={"lg"}
        h={"100%"}
        maxH={"250px"}
        onClick={onOpen}
      >
        <CardBody alignItems={"center"} justifyContent={"center"} h={"100%"}>
          <HStack alignItems={"center"} justifyContent={"center"} h={"100%"}>
            <AddIcon />
            <Text>Add Todo</Text>
          </HStack>
        </CardBody>
      </Card>
      <CustomForm title="Add Todo" isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AddTodoCard;
