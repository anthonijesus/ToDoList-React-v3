import React from "react";
import styles from "./DeleteForm.module.scss";
import { useTask } from "../../Context/TaskContext.jsx";
const DeleteForm = () => {
  const { removeTask, taskToDelete } = useTask();
  return (
    <div>
      <div className={styles.deleteTask}>
        <div className={styles.confirm}>
          <h4>Desea Borrar la tarea con el titulo?</h4>{" "}
          <span>
            <button onClick={() => removeTask(taskToDelete._id)}>SI</button>
          </span>
        </div>
        <h5>{taskToDelete.name}</h5>
      </div>
    </div>
  );
};

export default DeleteForm;
