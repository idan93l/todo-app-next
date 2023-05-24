import {
  Button,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";

function DeleteItem({ id, handleTodoDelete }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
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
        onClick={onOpen}
      >
        <FaTrashAlt size={20} />
      </Badge>
      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent top="7rem">
        <ModalHeader>Are you Sure?</ModalHeader>
        <ModalCloseButton />
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              handleTodoDelete(id);
              onClose();
            }}
          >
            Yes
          </Button>
          <Button onClick={onClose}>No</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
  );
}

export default DeleteItem;
