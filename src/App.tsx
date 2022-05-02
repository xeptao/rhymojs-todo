import React from "react";
import styles from "./App.module.css";

export const App: React.FC = () => {
  return (
    <>
      <header className={styles.AppHeader}>
        <div>
          <h1>To Do App with Rhymo.</h1>
          <p>
            This is an example of the implementation of Rhymo. <br /> See the{" "}
            <a href="https://github.com/xeptao/rhymojs-todo">
              GitHub repository
            </a>{" "}
            for the code.
          </p>
        </div>
      </header>
    </>
  );
};
