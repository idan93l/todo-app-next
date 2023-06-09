import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { deleteTodo, toggleTodoStatus, updateTodoContent } from "../../api/todo";
import { db } from "../../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Box, Flex, useToast, Text } from "@chakra-ui/react";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const { user } = useAuth();
  const toast = useToast();

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
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTodoDelete = async (id) => {
    // if (confirm("Are you sure you wanna delete this todo?")) {
      deleteTodo(id);
      toast({ title: "Todo deleted successfully", status: "success" });
    // }
  };

  const handleTodoToggle = async (id, status) => {
    const newStatus = status === "completed" ? "pending" : "completed";
    await toggleTodoStatus({ docId: id, status: newStatus });
    toast({
      title: `Todo marked ${newStatus}`,
      status: newStatus === "completed" ? "success" : "warning",
    });
  };

  const handleTodoEdit = async (id, newContent) => {
    await updateTodoContent({ docId: id, content: newContent });
    toast({
      title: `Todo updated successfully`,
      status: "success",
    });
  };

  return (
    <Box m="100px 0 30px 0">
      {!todos.length && (<Text mt="10rem" fontSize="3xl">If you want to start adding tasks, please login . . .</Text>)}
      <Flex flexDirection="column" justifyContent="space-evenly" gap={4}>
        {todos &&
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              todo={todo}
              handleTodoDelete={handleTodoDelete}
              handleTodoToggle={handleTodoToggle}
              handleTodoEdit={handleTodoEdit}
            />
          ))}
      </Flex>
    </Box>
  );
};

export default TodoList;
