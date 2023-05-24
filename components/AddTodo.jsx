import { useState } from "react";
import { addTodo } from "../api/todo";
import useAuth from "../hooks/useAuth";
import {
  Box,
  Button,
  Textarea,
  Stack,
  useToast,
  useColorMode,
} from "@chakra-ui/react";

const AddTodo = () => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { colorMode } = useColorMode();

  const toast = useToast();
  const { isLoggedIn, user } = useAuth();

  const handleTodoCreate = async () => {
    if (!isLoggedIn) {
      toast({
        title: "You must be logged in to create a todo",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    const todo = {
      content,
      userId: user.uid,
    };

    await addTodo(todo);

    setIsLoading(false);
    setContent("");
    toast({ title: "Todo created successfully", status: "success" });
  };

  return (
    <Box w="70%" margin={"0 auto"} display="block" mt={110}>
      <Stack direction="column">
        <Textarea
          placeholder="Write something to do..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          onClick={() => handleTodoCreate()}
          isDisabled={content.length < 1 || isLoading}
          backgroundColor={colorMode === "dark" ? "blue.900" : "blue.200"}
        >
          Add
        </Button>
      </Stack>
    </Box>
  );
};
export default AddTodo;
