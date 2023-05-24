import Navbar from "../components/common/Navbar";
import TodoList from "../components/Todo/TodoList";
import { Container } from "@chakra-ui/react";

export default function Home() {
  return (
    <Container
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      maxW="7xl"
    >
      <Navbar />
      <TodoList />
    </Container>
  );
}
