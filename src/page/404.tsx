import { Heading, Image, Stack, Text } from "@chakra-ui/react";
import NotFoundImage from "../assets/NotFoundIllustration.svg";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Stack
      w={"100%"}
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      gap={8}
    >
      <Image src={NotFoundImage} w={"500px"} color={"white"} />
      <Heading>404 NOT FOUND</Heading>
      <Link to={"/"}>
        <Text
          _hover={{ textDecoration: "underline", textUnderlineOffset: "4px" }}
        >
          Return to home
        </Text>
      </Link>
    </Stack>
  );
};

export default NotFound;
