import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

function LoginModal({ onClose, handleAuth, icon }) {
  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={true} onClose={onClose}>
        <ModalOverlay />
        <ModalContent top="7rem">
          <ModalHeader>Welcome!</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            In order to use this app, you need to login first.
          </ModalBody>
          <ModalFooter>
            <Button
              leftIcon={icon}
              colorScheme="blue"
              onClick={() => {
                handleAuth();
                onClose();
              }}
            >
              Login with Google
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LoginModal;
