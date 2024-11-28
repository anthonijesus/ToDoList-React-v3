import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import axios from "axios";

const TaskContext = createContext(); // Se crea el contexto con el cual podemos compartir datos entres los distintos componente

const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASK":
      return action.payload;
    case "ADD_TASK":
      return [...state, action.payload];
    case "REMOVE_TASK":
      return state.filter((task) => task._id !== action.payload);
    case "UPDATE_TASK":
      return state.map((task) =>
        task._id === action.payload._id ? action.payload : task
      );
    case "CHECK_TASK":
      return state.map((task) =>
        task._id === action.payload._id
          ? { ...task, isCompleted: action.payload.isCompleted }
          : task
      );
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  //
  const [isEditing, setIsEditing] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState({});
  const [taskToDelete, setTaskToDelete] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  //Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  //Cierra el modal y cierra el formulario de edición si esta abierto antes de que se ejecute una accion de agregar nueva tarea
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
  };

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/task");
        dispatch({ type: "SET_TASK", payload: response.data });
      } catch (error) {
        console.log("Fallo al traer los datos de la API", error);
      }
    };

    fetchTask();
  }, []);

  async function addNewTask(task) {
    //Hace la petición POST para guardar la nueva tarea
    try {
      const response = await axios.post("http://localhost:3000/api/task", task);
      dispatch({ type: "ADD_TASK", payload: response.data });
    } catch (error) {
      console.log("Error: ", error);
    }
    setIsModalOpen(false);
  }

  async function removeTask(taskId) {
    try {
      await axios.delete(`http://localhost:3000/api/task/${taskId}`);
      dispatch({ type: "REMOVE_TASK", payload: taskId });
    } catch (error) {
      console.log("Error: ", error);
    }
    setIsDeleting(false);
  }

  async function taskUpdated(task) {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/task/${task._id}`,
        task
      );
      dispatch({ type: "UPDATE_TASK", payload: response.data });
      //console.log(response.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  async function editTask(taskToEdited) {
    const taskUpdated = {
      _id: taskToEdited._id,
      name: taskToEdited.name,
      description: taskToEdited.description,
    };
    setTaskToEdit(taskUpdated);
    setIsEditing(true);
    setIsModalOpen(true);
  }

  async function completeTask(task) {
    //

    const { data } = await axios.get(
      `http://localhost:3000/api/task/${task._id}`
    ); // Trae la tarea con el id por parametro del server

    data.isCompleted = !data.isCompleted; // Cambia el estado de la tarea

    await axios.put(`http://localhost:3000/api/task/${task._id}`, {
      isCompleted: data.isCompleted,
    });

    // Despacha la acción con el id y el nuevo estado
    dispatch({
      type: "CHECK_TASK",
      payload: { _id: task._id, isCompleted: data.isCompleted },
    });
  }
  //

  async function showDeleteTask(task) {
    console.log(task);
    setTaskToDelete(task);
    setIsDeleting(true);
    setIsEditing(false);
  }

  return (
    <TaskContext.Provider //El .Provider es una propiedad de React que nos permite compartir datos con el contexto que se creo al inicio ---> </TaskContext.Provider>const TaskContext = createContext();
      value={{
        tasks,
        addNewTask,
        removeTask,
        taskUpdated,
        completeTask,
        isEditing,
        setIsEditing,
        editTask,
        taskToEdit,
        isDeleting,
        setIsDeleting,
        showDeleteTask,
        taskToDelete,
        isModalOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);
