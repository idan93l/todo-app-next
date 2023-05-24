import { useState } from "react";
import {
  FaTrashAlt,
  FaRegCheckCircle,
  FaRegCircle,
  FaEdit,
} from "react-icons/fa";
import {
  Badge,
  Box,
  Heading,
  Text,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import AddEditModal from "../common/AddEditModal";
import DeleteItem from "./DeleteItem";

const TodoItem = ({
  id,
  todo,
  handleTodoDelete,
  handleTodoToggle,
  handleTodoEdit,
}) => {
  const [content, setContent] = useState(todo.content);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  return (
    <Box
      p={3}
      width="90vw"
      boxShadow={colorMode === "light" ? "lg" : "dark-lg"}
      transition="0.2s"
      borderRadius="8px"
      _hover={{ boxShadow: "base" }}
    >
      <Heading>
        <DeleteItem id={id} handleTodoDelete={handleTodoDelete} />
        <Badge
          color="blue.500"
          bg="inherit"
          transition={"0.2s"}
          _hover={{
            bg: "inherit",
            transform: "scale(1.2)",
          }}
          float="right"
          cursor="pointer"
          onClick={onOpen}
        >
          <FaEdit size={20} />
        </Badge>
        <Badge
          color={todo.status === "pending" ? "yellow.500" : "green.500"}
          bg="inherit"
          transition={"0.2s"}
          _hover={{
            bg: "inherit",
            transform: "scale(1.2)",
          }}
          float="right"
          cursor="pointer"
          onClick={() => handleTodoToggle(todo.id, todo.status)}
        >
          {todo.status === "pending" ? (
            <FaRegCircle size={20} />
          ) : (
            <FaRegCheckCircle size={20} />
          )}
        </Badge>
      </Heading>
      <Text
        textDecoration={todo.status === "pending" ? "none" : "line-through"}
      >
        {todo.content}
      </Text>
      <AddEditModal
        isOpen={isOpen}
        onClose={onClose}
        header="Update task"
        button="Save"
        id={todo.id}
        content={content}
        setContent={setContent}
        handleFunction={handleTodoEdit}
      />
    </Box>
  );
};

export default TodoItem;
