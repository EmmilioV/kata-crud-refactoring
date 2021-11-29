import React, { useContext, useEffect } from 'react';
import TYPES from "../Types"
import Store from "./Store"

const List = (props) => {
    const {dispatch, state: { todo } } = useContext(Store);
    const currentList = todo.list;

    useEffect(() => {
        fetch(props.HOST_API + "/todos")
        .then((response) => response.json())
        .then((list) => {
            dispatch({ type: TYPES.UPDATE_LIST, list });
        });
    }, [dispatch]);

    const onDelete = (todoId) => {
        fetch(props.HOST_API + "/" + todoId + "/todo", {
        method: "DELETE",
        }).then((list) => {
        dispatch({ type: TYPES.DELETE_ITEM, todoId });
        });
    };

    const onEdit = (todo) => {
        dispatch({ type: TYPES.EDIT_ITEM, item: todo });
    };

    const onChange = (event, todo) => {
        const request = {
        name: todo.name,
        todoId: todo.todoId,
        isCompleted: event.target.checked,
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
        });
    };

    const decorationDone = {
        textDecorationLine: "line-through",
    };
    return (
        <div>
        <table>
            <thead>
            <tr>
                <td>ID</td>
                <td>Tarea</td>
                <td>¿Completado?</td>
            </tr>
            </thead>
            <tbody>
            {currentList.map((todo) => {
                return (
                <tr
                    key={todo.todoId}
                    style={todo.isCompleted ? decorationDone : {}}
                >
                    <td>{todo.todoId}</td>
                    <td>{todo.name}</td>
                    <td>
                    <input
                        type="checkbox"
                        defaultChecked={todo.isCompleted}
                        onChange={(event) => onChange(event, todo)}
                    ></input>
                    </td>
                    <td>
                    <button onClick={() => onDelete(todo.todoId)}>
                        Eliminar
                    </button>
                    </td>
                    <td>
                    <button onClick={() => onEdit(todo)}>Editar</button>
                    </td>
                </tr>
                );
            })}
            </tbody>
        </table>
        </div>
    );
};

export default List;
