/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Icon,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AiFillFileText } from "react-icons/ai";
import { BsDownload, BsUpload } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
//import papaparse as parsing library
import Papa, { ParseResult } from "papaparse";
//import uuid for id generator
import { v4 as uuidv4 } from "uuid";
import { AppDispatch, useAppSelector } from "../../../../../redux/store";
//import data type
import { todoType } from "../../../../../type";
//import action reducer from redux
import {
  addImportCategories,
  addTodo,
  setCategories,
  setTodo,
} from "../../../../../redux/slices/todoSlice";
//import styling
import {
  backgroundContainerColor,
  buttonMonoHoverStyle,
  iconButtonActionHoverStyle,
  primaryColor,
  textColor,
} from "../../../../../component/style";
//import alert modal confirmation
import AlertDialogConfirmation from "./fragment/AlertDialogConfirmation";

const FileAction = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [isAddImport, setIsAddImport] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { todo } = useAppSelector((state) => state.todo);
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();

  //handle content file after upload
  useEffect(() => {
    if (selectedFile) {
      if (isConfirmed) {
        if (selectedFile.type === "application/json") {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target) {
              const fileContent = e.target.result;
              if (typeof fileContent === "string") {
                const data = JSON.parse(fileContent);
                if (data.todo) {
                  const newData = data.todo.map((item: any) => ({
                    ...item,
                    id: uuidv4(),
                  }));
                  const dataTodo: todoType[] = newData;

                  if (!isAddImport) {
                    dispatch(setTodo(dataTodo));
                    dispatch(setCategories(dataTodo));
                  } else {
                    dataTodo.map((item) => dispatch(addTodo(item)));
                    dispatch(addImportCategories(dataTodo));
                  }
                  toast({
                    title: "Success import JSON file!",
                    status: "success",
                    position: "top-right",
                    isClosable: true,
                  });
                }
              }
            }
          };
          reader.readAsText(selectedFile);
        } else if (selectedFile.type === "text/csv") {
          handleFileCSV(selectedFile, isAddImport);
        }
        setIsAddImport(false);
        setIsConfirmed(false);
      } else {
        setIsAddImport(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isAddImport, isConfirmed, selectedFile, toast]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error, Please choose JSON/CSV file!",
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    }
  }, [error, toast]);

  //handle export json
  const handleExportJSON = () => {
    if (todo) {
      const dataTodo = {
        todo,
      };
      const json = JSON.stringify(dataTodo, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      // Create a hidden anchor element and trigger a click to download the file
      const a = document.createElement("a");
      a.href = url;
      a.download = "todo.json";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
      toast({
        title: "Success export JSON file!",
        status: "success",
        position: "top-right",
        isClosable: true,
      });
    }
  };

  //handle export csv
  const handleExportCSV = () => {
    if (todo) {
      // Transform JSON data to a CSV string
      const csv = Papa.unparse(todo);

      // Create a Blob with the CSV data
      const blob = new Blob([csv], { type: "text/csv" });

      // Create a download link and trigger the download
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "exportTodo.csv";
      a.click();
      URL.revokeObjectURL(url);
      toast({
        title: "Success export CSV file!",
        status: "success",
        position: "top-right",
        isClosable: true,
      });
    }
  };

  //handle file import csv
  const handleFileCSV = (file: File, isAdd: boolean) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (result: ParseResult<todoType>) => {
        const filteredData = result.data.filter((row) => row["id"] !== null);
        console.log(filteredData);
        if (!isAdd) {
          dispatch(setTodo(filteredData));
          dispatch(setCategories(filteredData));
        } else {
          filteredData.map((item) => dispatch(addTodo(item)));
          dispatch(addImportCategories(filteredData));
        }
        toast({
          title: "Success import CSV file!",
          status: "success",
          position: "top-right",
          isClosable: true,
        });
      },
      error: (error) => {
        console.error("CSV parsing error:", error.message);
      },
    });
  };

  //handle button import clicked
  const handleFileInputClicked = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  //handle upload file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const allowedFormats = [".json", ".csv"];
      const fileExtension = file.name.slice(
        ((file.name.lastIndexOf(".") - 1) >>> 0) + 2
      );

      if (allowedFormats.includes(`.${fileExtension}`)) {
        onOpen();
        setSelectedFile(file);
        setError("");
      } else {
        setSelectedFile(null);
        setError("Please input json/csv file!");
      }
    }
  };

  return (
    <>
      <Menu closeOnSelect={false}>
        <Stack>
          <MenuButton
            as={IconButton}
            aria-label="filter-button"
            icon={<AiFillFileText />}
            color={textColor()}
            opacity={0.8}
            cursor={"pointer"}
            border={"1px"}
            borderColor={"gray.600"}
            bg={"transparent"}
            _hover={iconButtonActionHoverStyle()}
            _active={iconButtonActionHoverStyle()}
          />
        </Stack>
        <MenuList
          color={textColor()}
          border={"1px"}
          borderColor={primaryColor()}
          bg={backgroundContainerColor()}
        >
          <MenuItem
            px={4}
            as={Button}
            leftIcon={<Icon as={BsDownload} mr={6} />}
            bg={"transparent"}
            _hover={buttonMonoHoverStyle()}
            rounded={"none"}
            onClick={handleFileInputClicked}
            fontWeight={"300"}
          >
            <Input
              type="file"
              accept=".json, .csv"
              display={"none"}
              ref={fileInputRef}
              id="file"
              onChange={handleFileChange}
            />
            <Text as={"span"} w={"100%"} textAlign={"left"} display={"flex"}>
              Import File
            </Text>
          </MenuItem>
          <MenuDivider borderColor={primaryColor()} />
          <MenuGroup defaultValue="json" title="Export" fontWeight={"300"}>
            <MenuItem
              px={4}
              as={Button}
              leftIcon={<Icon as={BsUpload} mr={6} />}
              rounded={"none"}
              value="asc"
              bg={"transparent"}
              _hover={buttonMonoHoverStyle()}
              onClick={handleExportJSON}
              fontWeight={"300"}
            >
              <Text as={"span"} w={"100%"} textAlign={"left"} display={"flex"}>
                Export to JSON
              </Text>
            </MenuItem>
            <MenuItem
              px={4}
              as={Button}
              leftIcon={<Icon as={BsUpload} mr={6} />}
              rounded={"none"}
              value="asc"
              bg={"transparent"}
              _hover={buttonMonoHoverStyle()}
              onClick={handleExportCSV}
              fontWeight={"300"}
            >
              <Text as={"span"} w={"100%"} textAlign={"left"} display={"flex"}>
                Export to CSV
              </Text>
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
      <AlertDialogConfirmation
        isOpen={isOpen}
        onClose={onClose}
        setIsAddImport={setIsAddImport}
        setIsConfirmed={setIsConfirmed}
      />
    </>
  );
};

export default FileAction;
