import React from "react";
import styles from "./Modal.module.scss";
import AddToDoForm from "../AddToDoForm/AddToDoForm";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Si no está abierto, no renderiza nada

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {children} {<AddToDoForm />}
        <button className={styles.modalClose} onClick={onClose}>
          cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
