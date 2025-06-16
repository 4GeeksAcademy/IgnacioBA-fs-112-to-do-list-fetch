import React, { useState } from "react";

const List = () => {

    const [input, setInput] = useState("");
    const [items, setItems] = useState([]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setItems(items.concat(input))
            setInput("");
        }
    };

    const handleDelete = (indexToRemove) => {
        const newArray = items.filter((item, index) => {
            return index !== indexToRemove;
        });
        setItems(newArray);
    }

    return (
        <div className="container mt-4">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="form-control mb-3"
                placeholder="Añadir tarea"
            />

            <ul className="list-group">
                {items.map((item, index) => (
                    <li key={index} className="li-container list-group-item">{item}<button
                        className="delete-button"
                        onClick={() => handleDelete(index)}
                    >
                        ✕
                    </button></li>
                ))}

            </ul>
        </div>
    );

};

export default List;