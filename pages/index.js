import { Container } from "@chakra-ui/react";
import AddTodo from "../components/AddTodo";
import Navbar from "../components/Navbar";
import TodoList from "../components/TodoList";
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
