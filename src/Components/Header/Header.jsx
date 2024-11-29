import React from "react";
import styles from "./Header.module.scss";
import { useTask } from "../../Context/TaskContext.jsx";

const Header = () => {
  const { openModal } = useTask();
  return (
    <header className={styles.header}>
      <h1>ToDo List React</h1>
      <span>
        <button onClick={openModal}>Agrega Nuevas Tareas</button>
      </span>
    </header>
  );
};

export default Header;
