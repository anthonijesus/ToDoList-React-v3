import { useTask } from "../../Context/TaskContext.jsx";
import ToDoItem from "../ToDoItem/ToDoItem.jsx";
import Modal from "../Modal/Modal.jsx";
import styles from "./ToDoList.module.scss";
//

const ToDoList = () => {
  const { tasks, isModalOpen, closeModal } = useTask();
  //
  return (
    <section className={styles.section}>
      <Modal isOpen={isModalOpen} onClose={closeModal}></Modal>
      <div className={styles.todoList}>
        <div className={styles.listado}>
          <h2>Lista de Tareas</h2>
          <table>
            <thead>
              <tr>
                <th>Acciones</th>
                <th>Tarea</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Creador</th>
              </tr>
            </thead>
            {tasks.map((task) => (
              <ToDoItem key={task._id} task={task} />
            ))}
          </table>
        </div>
      </div>
    </section>
  );
};

export default ToDoList;
