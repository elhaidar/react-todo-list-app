import { HStack, Button, IconButton } from "@chakra-ui/react";
//import custom hooks
import { usePagination, DOTS } from "../../hooks/usePagination";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
//import styling
import {
  backgroundContainerCardColor,
  primaryColor,
  primaryHoverStyle,
  textColor,
} from "../style";

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}: {
  onPageChange: (data: number | string) => void;
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  let lastPage = paginationRange && paginationRange[paginationRange.length - 1];

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  //handle click next
  const onNext = () => {
    if (currentPage !== lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  //handle click prev
  const onPrevious = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <HStack
      justifyContent={"space-around"}
      py={8}
      mt={4}
      color={textColor()}
      fontWeight={"light"}
    >
      <IconButton
        aria-label="prev-button"
        as={ChevronLeftIcon}
        onClick={onPrevious}
        size={"xs"}
        bg={"none"}
        color={textColor()}
        _hover={{ bg: "none" }}
        cursor={currentPage === 1 ? "default" : "pointer"}
        opacity={currentPage === 1 ? 0.5 : 1}
      />
      <HStack gap={2}>
        {paginationRange &&
          paginationRange.map((pageNumber) => {
            if (pageNumber === DOTS) {
              return (
                <Button
                  key={pageNumber}
                  p={0}
                  rounded={"lg"}
                  bg={backgroundContainerCardColor()}
                  color={textColor()}
                  fontWeight={"400"}
                  _hover={{ bg: backgroundContainerCardColor() }}
                  cursor={"default"}
                >
                  &#8230;
                </Button>
              );
            }

            return (
              <Button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                p={0}
                rounded={"lg"}
                bg={
                  pageNumber === currentPage
                    ? primaryColor()
                    : backgroundContainerCardColor()
                }
                color={pageNumber === currentPage ? "gray.50" : textColor()}
                fontWeight={"400"}
                _hover={primaryHoverStyle()}
              >
                {pageNumber}
              </Button>
            );
          })}
      </HStack>
      <IconButton
        aria-label="next-button"
        as={ChevronRightIcon}
        onClick={onNext}
        size={"xs"}
        bg={"none"}
        color={textColor()}
        _hover={{ bg: "none" }}
        cursor={currentPage === lastPage ? "default" : "pointer"}
        opacity={currentPage === lastPage ? 0.5 : 1}
      />
    </HStack>
  );
};

export default Pagination;
