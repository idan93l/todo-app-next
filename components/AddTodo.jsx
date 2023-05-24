import { useState } from "react";
import { addTodo } from "../api/todo";
import AddEditModal from "./AddEditModal";
import useAuth from "../hooks/useAuth";
import { Button, useToast, useDisclosure } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const AddTodo = () => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { isLoggedIn, user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    <>
      <Button
        height="52px"
        width="52px"
        borderRadius="10px"
        boxShadow="inner"
        onClick={onOpen}
      >
        <FaPlus size={20} />
      </Button>
      <AddEditModal
        isOpen={isOpen}
        onClose={onClose}
        header="Add New Task"
        button="Add"
        placeholder="Write something to do..."
        content={content}
        isLoading={isLoading}
        setContent={setContent}
        close={true}
        handleFunction={handleTodoCreate}
      />
    </>
  );
};
export default AddTodo;
