import { Box, Button, Link, Text, useColorMode } from "@chakra-ui/react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
import AddTodo from "./AddTodo";

const Navbar = () => {
  const { isLoggedIn, user } = useAuth();
  const { toggleColorMode, colorMode } = useColorMode();

  const handleAuth = async () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
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
        onClick={() => toggleColorMode()}
      >
        {colorMode === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
      </Button>
      {isLoggedIn && (
        <>
          <AddTodo />
          <Button height="52px" width="52px" borderRadius="10px" >
            <Link color="red.500" onClick={() => auth.signOut()}>
              <TbLogout size={30} />
            </Link>
          </Button>
        </>
      )}
      {!isLoggedIn && (
        <Button leftIcon={<FaGoogle />} onClick={() => handleAuth()}>
          Login with Google
        </Button>
      )}
    </Box>
  );
};

export default Navbar;
