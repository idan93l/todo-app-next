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
  Button,
  Textarea,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from "@chakra-ui/react";

const TodoItem = ({
  id,
  todo,
  handleTodoDelete,
  handleTodoToggle,
  handleTodoEdit,
}) => {
  const [content, setContent] = useState(todo.content);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      p={3}
      boxShadow="1xl"
      shadow={"dark-lg"}
      transition="0.2s"
      _hover={{ boxShadow: "sm" }}
      borderRadius="8px"
      width="90vw"
    >
      <Heading>
        <Badge
          color="red.500"
          bg="inherit"
          transition={"0.2s"}
          _hover={{
            bg: "inherit",
            transform: "scale(1.2)",
          }}
          float="right"
          size="xs"
          cursor="pointer"
          onClick={() => handleTodoDelete(id)}
        >
          <FaTrashAlt size={20} />
        </Badge>
        <Badge
          color="blue.500"
          bg="inherit"
          transition={"0.2s"}
          _hover={{
            bg: "inherit",
            transform: "scale(1.2)",
          }}
          float="right"
          size="xs"
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
          size="xs"
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => {handleTodoEdit(todo.id, content)}}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TodoItem;
