import React from "react";
import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import { TaskProvider } from "./Context/TaskContext.jsx";
import styles from "./App.module.scss";

import ToDoList from "./Components/ToDoList/ToDoList.jsx";

function App() {
  return (
    <div className={styles.container}>
      <TaskProvider>
        <Header />
        <ToDoList />
        <Footer />
      </TaskProvider>
    </div>
  );
}

export default App;
