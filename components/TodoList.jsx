import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { deleteTodo, toggleTodoStatus } from "../api/todo";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
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
  Flex,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const { user } = useAuth();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const refreshData = () => {
    if (!user) {
      setTodos([]);
      return;
    }
    const q = query(collection(db, "todo"), where("user", "==", user.uid));

    onSnapshot(q, (querySnapchot) => {
      let ar = [];
      querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      ar.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
      setTodos(ar);
    });
  };

  useEffect(() => {
    refreshData();
  }, [user]);

  const handleTodoDelete = async (id) => {
    if (confirm("Are you sure you wanna delete this todo?")) {
      deleteTodo(id);
      toast({ title: "Todo deleted successfully", status: "success" });
    }
  };

  const handleToggle = async (id, status) => {
    const newStatus = status === "completed" ? "pending" : "completed";
    await toggleTodoStatus({ docId: id, status: newStatus });
    toast({
      title: `Todo marked ${newStatus}`,
      status: newStatus === "completed" ? "success" : "warning",
    });
  };

  return (
    <Box m={10}>
      <Flex flexDirection="column" justifyContent="space-evenly" gap={4}>
        {todos &&
          todos.map((todo) => (
            <Box
              key={todo.id}
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
                  onClick={() => handleTodoDelete(todo.id)}
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
                  onClick={() => handleToggle(todo.id, todo.status)}
                >
                  {todo.status === "pending" ? (
                    <FaRegCircle size={20} />
                  ) : (
                    <FaRegCheckCircle size={20} />
                  )}
                </Badge>
              </Heading>
              <Text
                textDecoration={
                  todo.status === "pending" ? "none" : "line-through"
                }
              >
                {todo.content}
              </Text>
            </Box>
          ))}
      </Flex>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input placeholder="First name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder="Last name" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TodoList;
