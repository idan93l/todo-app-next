import {
  Box,
  Button,
  Link,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { auth } from "../../firebase";
import useAuth from "../../hooks/useAuth";
import AddTodo from "../Todo/AddTodo";
import LoginModal from "./LoginModal";

const Navbar = () => {
  const { isLoggedIn, user } = useAuth();
  const { toggleColorMode, colorMode } = useColorMode();
  const { onClose } = useDisclosure();

  const handleAuth = async () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <Box
      width="100vw"
      height={70}
      position={"fixed"}
      top={0}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p="30px 20px"
      backgroundColor={colorMode === "dark" ? "blue.900" : "blue.200"}
      zIndex={1}
    >
      <Button
        height="52px"
        width="52px"
        color="yellow.400"
        borderRadius="10px"
        boxShadow="inner"
        onClick={() => toggleColorMode()}
      >
        {colorMode === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
      </Button>
      {isLoggedIn && (
        <>
          <AddTodo />
          <Button
            height="52px"
            width="52px"
            borderRadius="10px"
            boxShadow="inner"
          >
            <Link color="red.500" onClick={() => auth.signOut()}>
              <TbLogout size={30} />
            </Link>
          </Button>
        </>
      )}
      {!isLoggedIn && (
        <>
          <LoginModal
            onClose={onClose}
            handleAuth={handleAuth}
            icon={<FaGoogle />}
          />
          <Button leftIcon={<FaGoogle />} onClick={() => handleAuth()}>
            Login with Google
          </Button>
        </>
      )}
    </Box>
  );
};

export default Navbar;
