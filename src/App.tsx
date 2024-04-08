import React from "react";
import GameField from "./components/GameField/GameField";
import styles from "./App.module.css";
function App() {
    return (
        <div className={styles.App}>
            <h1>Тестовое задание Биллиард</h1>
            <h3>Выполнил Кузьмин Никита</h3>
            <GameField />
        </div>
    );
}

export default App;
