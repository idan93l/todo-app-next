export const handleTodoDelete = async (id) => {
  if (confirm("Are you sure you wanna delete this todo?")) {
    deleteTodo(id);
    toast({ title: "Todo deleted successfully", status: "success" });
  }
};

export const handleToggle = async (id, status) => {
  const newStatus = status === "completed" ? "pending" : "completed";
  await toggleTodoStatus({ docId: id, status: newStatus });
  toast({
    title: `Todo marked ${newStatus}`,
    status: newStatus === "completed" ? "success" : "warning",
  });
};