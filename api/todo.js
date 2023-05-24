import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const addTodo = async ({ userId, content }) => {
  try {
    await addDoc(collection(db, "todo"), {
      user: userId,
      content: content,
      status: "pending",
      createdAt: new Date().getTime(),
    });
  } catch (err) {}
};

const toggleTodoStatus = async ({ docId, status }) => {
  try {
    const todoRef = doc(db, "todo", docId);
    await updateDoc(todoRef, {
      status,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateTodoContent = async ({ docId, content }) => {
  try {
    const todoRef = doc(db, "todo", docId);
    await updateDoc(todoRef, {
      content,
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteTodo = async (docId) => {
  try {
    const todoRef = doc(db, "todo", docId);
    await deleteDoc(todoRef);
  } catch (err) {
    console.log(err);
  }
};
export { addTodo, toggleTodoStatus, updateTodoContent, deleteTodo };
