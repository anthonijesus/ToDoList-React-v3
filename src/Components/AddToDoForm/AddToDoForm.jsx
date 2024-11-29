import React, { useEffect } from "react";
import { useState } from "react";
import { useTask } from "../../Context/TaskContext";
import styles from "./AddToDoForm.module.scss";

const AddToDoForm = () => {
  const { addNewTask, taskToEdit, taskUpdated, closeModal, isEditing } =
    useTask();

  const [taskName, setTaskName] = useState(taskToEdit?.name || "");
  const [taskDescription, setTaskDescription] = useState(
    taskToEdit?.description || ""
  );

  useEffect(() => {
    if (isEditing && taskToEdit) {
      setTaskName(taskToEdit.name || "");
      setTaskDescription(taskToEdit.description || "");
    } else if (!isEditing) {
      setTaskName("");
      setTaskDescription("");
    }
  }, [isEditing, taskToEdit]);

  function updateTask() {
    const updatedTask = {
      _id: taskToEdit._id,
      name: taskName,
      description: taskDescription,
    };

    if (updatedTask.name === "" || updatedTask.description === "") {
      alert("Hay campos vacios en el formulario");
      return;
    }

    taskUpdated(updatedTask);
    closeModal();
  }

  //
  const submitTask = (event) => {
    event.preventDefault();
    let task = {
      name: taskName,
      description: taskDescription,
      isCompleted: false,
      creator: "Anthoni Merchan",
    };
    if (task.name === "" || task.description === "") {
      alert("Hay campos vacios en el formulario");
      return;
    }
    addNewTask(task);

    setTaskName("");
    setTaskDescription("");
  };

  return (
    <div className={styles.formulario}>
      <form onSubmit={submitTask}>
        {!isEditing ? <h2>Agrega tus Tareas </h2> : <h2>Editar Tarea </h2>}
        <label htmlFor="name">Nombre de la tarea</label>
        <input
          type="text"
          value={taskName || ""}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
        <label htmlFor="description">Descripción de la tarea</label>
        <input
          type="text"
          value={taskDescription || ""}
          onChange={(e) => setTaskDescription(e.target.value)}
          required
        />
        <div>
          {!isEditing && <button type="submit">Crear Tarea</button>}
          {isEditing && (
            <>
              <button type="button" onClick={() => updateTask()}>
                Editar Tarea
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddToDoForm;
