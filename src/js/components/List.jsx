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
        const newArray = items.filter((_, index) => {
            return index !== indexToRemove;
        });
        setItems(newArray);
    }
    const deleteAll = () => {
       setItems([]);
    }

    return (
        <div className="container mt-4">
            <div className="container my-3">LISTA DE TAREAS</div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="form-control mb-3"
                placeholder="Añadir tarea"
            />

            {/* <ul className="list-group">
                {items.map((item, index) => (
                    <li key={index} className="li-container list-group-item">{item}<button
                        className="delete-button"
                        onClick={() => handleDelete(index)}
                    >
                        ✕
                    </button></li>
                ))}

            </ul> */}
            <div className = "container my-2"> Tareas pendientes: {items.length} 
                <button type="button" className="btn btn-danger mx-5" onClick={deleteAll}>Borrar todo</button>
            </div>
        </div>
    );

};

export default List;