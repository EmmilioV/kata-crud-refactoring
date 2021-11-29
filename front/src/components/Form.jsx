import React, { useContext, useRef, useState } from "react";
import { Fragment } from "react";
import TYPES from "../Types"
import Store from "./Store"

const Form = (props) => {
    
    const formRef = useRef(null);
    const {dispatch, state: { todo }} = useContext(Store);
    const item = todo.item;
    const [state, setState] = useState(item);

    const onAdd = (event) => {
        event.preventDefault();
    
        const request = {
        name: state.name,
        todoId: null,
        isCompleted: false,
        };

        if(request.name !== undefined){
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
        }
    };

    const onEdit = (event) => {
        event.preventDefault();
    
        const request = {
        name: state.name,
        todoId: item.todoId,
        isCompleted: item.isCompleted,
        };
    
        if(request.name !== '')
        {
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
        }
    };

    return (
        <Fragment>
            <form className="form-group" ref={formRef}>
                <div className="row ">
                    <div className="col-md-2">
                    <input
                        className="form-control input-group mb-3"
                        type="text"
                        name="name"
                        placeholder="¿Qué piensas hacer hoy?"
                        defaultValue={item.name}
                        onChange={(event) => {
                        setState({ ...state, name: event.target.value });
                        }}
                    ></input>
                    </div>
                    <div className ="col-md-2">
                        {item.todoId && <button className='btn btn-outline-warning mr-2' onClick={onEdit}>Actualizar</button>}
                        {!item.todoId && <button className='btn btn-outline-success' onClick={onAdd}>Crear</button>}
                    </div>
                </div>
            </form>
        </Fragment>
    );
};

export default Form;
