import React, { useContext, useRef, useState } from "react";
import TYPES from "./Types"

const Form = (props) => {
    
    const formRef = useRef(null);
    const {dispatch, state: { todo }} = useContext(props.Store);
    const item = todo.item;
    const [state, setState] = useState(item);

    const onAdd = (event) => {
        event.preventDefault();
    
        const request = {
        name: state.name,
        todoId: null,
        isCompleted: false,
        };
    
        fetch(props.HOST_API + "/todo", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
            "Content-Type": "application/json",
        },
        })
        .then((response) => response.json())
        .then((todo) => {
            dispatch({ type: TYPES.ADD_ITEM, item: todo });
            setState({ name: "" });
            formRef.current.reset();
        });
    };

    const onEdit = (event) => {
        event.preventDefault();
    
        const request = {
        name: state.name,
        todoId: item.todoId,
        isCompleted: item.isCompleted,
        };
    
        fetch(props.HOST_API + "/todo", {
        method: "PUT",
        body: JSON.stringify(request),
        headers: {
            "Content-Type": "application/json",
        },
        })
        .then((response) => response.json())
        .then((todo) => {
            dispatch({ type: TYPES.UPDATE_ITEM, item: todo });
            setState({ name: "" });
            formRef.current.reset();
        });
    };

    return (
        <form ref={formRef}>
        <input
            type="text"
            name="name"
            placeholder="¿Qué piensas hacer hoy?"
            defaultValue={item.name}
            onChange={(event) => {
            setState({ ...state, name: event.target.value });
            }}
        ></input>
        {item.todoId && <button onClick={onEdit}>Actualizar</button>}
        {!item.todoId && <button onClick={onAdd}>Crear</button>}
        </form>
    );
};

export default Form;
