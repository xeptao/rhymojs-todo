import React, { useEffect, useState } from "react";
import { useLocalStorage } from "@rhymo/core";

import styles from "./App.module.css";

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage("todos");
  const [input, setInput] = useState("");
  const [items, setItems] = useState([""]);

  const randomChorePicker = () => {
    const chores = [
      "Wash the dishes",
      "Do your homework",
      "Shower",
      "Exercise",
    ];

    const index = Math.floor(Math.random() * chores.length);

    return chores[index];
  };

  useEffect(() => {
    const todosLocalStorage = (todos as string).split(",");
    setItems(todosLocalStorage as string[]);
  }, []);

  useEffect(() => {
    if (items !== Array(todos)) {
      if (items[0] !== "") {
        setTodos(items.toString());
      } else {
        setTodos([...items.splice(0, 1)].toString());
      }
    }
  }, [items]);

  const deleteItem = (index: number) =>
    setItems((previous) => {
      const oldItems = previous;
      return oldItems.filter((_, i) => i !== index);
    });

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

      <main className={styles.AppMain}>
        <div>
          <ul>
            {items.length > 0 &&
              items.map((item, index) => {
                if (item !== "") {
                  return (
                    <li key={index}>
                      <div onClick={() => deleteItem(index)}>Delete?</div>
                      <span>{item}</span>
                    </li>
                  );
                }
              })}
          </ul>

          <input
            type="text"
            placeholder={randomChorePicker()}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                if (input !== "") {
                  setItems((previous) => [...previous, input]);
                }

                (event.target as HTMLInputElement).value = "";
              }
            }}
          />

          <div className={styles.Buttons}>
            <form
              onSubmit={(event) => {
                event.preventDefault();

                if (input !== "") {
                  setItems((previous) => [...previous, input]);
                }
              }}
            >
              <button>Add Item</button>
            </form>

            <button
              onClick={() => {
                setItems([]);
              }}
            >
              Clear All
            </button>
          </div>
        </div>
      </main>
    </>
  );
};
