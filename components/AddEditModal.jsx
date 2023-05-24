import {
  Button,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const AddEditModal = ({
  isOpen,
  onClose,
  header,
  button,
  content,
  setContent,
  id,
  handleFunction,
  close,
  isLoading,
  placeholder
}) => {
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Textarea
            value={content}
            placeholder={placeholder}
            onChange={(e) => setContent(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            isDisabled={content === "" || isLoading}
            onClick={() => {
              handleFunction(id, content);
              if (close) {
                onClose();
              }
            }}
          >
            {button}
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddEditModal;
