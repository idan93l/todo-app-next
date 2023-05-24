import { useState } from "react";
import { addTodo } from "../api/todo";
import useAuth from "../hooks/useAuth";
import {
  Button,
  Textarea,
  useToast,
  useDisclosure,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const AddTodo = () => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { colorMode } = useColorMode();
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
      <Button height="52px" width="52px" borderRadius="10px" onClick={onOpen}>
        <FaPlus size={20} />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Textarea
              placeholder="Write something to do..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              backgroundColor={colorMode === "dark" ? "blue.900" : "blue.200"}
              isDisabled={content.length < 1 || isLoading}
              onClick={() => {
                handleTodoCreate();
              }}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AddTodo;
