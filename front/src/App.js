import React, { useContext, useReducer, useEffect, useRef, useState, createContext } from 'react';
import reducer from "./Reducer"
import TYPES from "./components/Types"

const HOST_API = "http://localhost:8080/api";

const initialState = {
  todo: { list: [], item: {} }
};

const Store = createContext(initialState);

const Form = () => {
  const formRef = useRef(null);
  const { dispatch, state: { todo } } = useContext(Store);
  const item = todo.item;
  const [state, setState] = useState(item);

  const onAdd = (event) => {
    event.preventDefault();

    const request = {
      name: state.name,
      todoId: null,
      isCompleted: false
    };


    fetch(HOST_API + "/todo", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((todo) => {
        dispatch({ type: TYPES.ADD_ITEM, item: todo });
        setState({ name: "" });
        formRef.current.reset();
      });
  }

  const onEdit = (event) => {
    event.preventDefault();

    const request = {
      name: state.name,
      todoId: item.todoId,
      isCompleted: item.isCompleted
    };


    fetch(HOST_API + "/todo", {
      method: "PUT",
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((todo) => {
        dispatch({ type: TYPES.UPDATE_ITEM, item: todo });
        setState({ name: "" });
        formRef.current.reset();
      });
  }

  return <form ref={formRef}>
    <input
      type="text"
      name="name"
      placeholder="¿Qué piensas hacer hoy?"
      defaultValue={item.name}
      onChange={(event) => {
        setState({ ...state, name: event.target.value })
      }}  ></input>
    {item.todoId && <button onClick={onEdit}>Actualizar</button>}
    {!item.todoId && <button onClick={onAdd}>Crear</button>}
  </form>
}


const List = () => {
  const { dispatch, state: { todo } } = useContext(Store);
  const currentList = todo.list;

  useEffect(() => {
    fetch(HOST_API + "/todos")
      .then(response => response.json())
      .then((list) => {
        dispatch({ type: TYPES.UPDATE_LIST, list })
      })
  }, [dispatch]);


  const onDelete = (todoId) => {
    fetch(HOST_API + "/" + todoId + "/todo", {
      method: "DELETE"
    }).then((list) => {
      dispatch({ type: TYPES.DELETE_ITEM, todoId })
    })
  };

  const onEdit = (todo) => {
    dispatch({ type: TYPES.EDIT_ITEM, item: todo })
  };

  const onChange = (event, todo) => {
    const request = {
      name: todo.name,
      todoId: todo.todoId,
      isCompleted: event.target.checked
    };
    fetch(HOST_API + "/todo", {
      method: "PUT",
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((todo) => {
        dispatch({ type: TYPES.UPDATE_ITEM, item: todo });
      });
  };

  const decorationDone = {
    textDecorationLine: 'line-through'
  };
  return <div>
    <table >
      <thead>
        <tr>
          <td>ID</td>
          <td>Tarea</td>
          <td>¿Completado?</td>
        </tr>
      </thead>
      <tbody>
        {currentList.map((todo) => {
          return <tr key={todo.todoId} style={todo.isCompleted ? decorationDone : {}}>
            <td>{todo.todoId}</td>
            <td>{todo.name}</td>
            <td><input type="checkbox" defaultChecked={todo.isCompleted} onChange={(event) => onChange(event, todo)}></input></td>
            <td><button onClick={() => onDelete(todo.todoId)}>Eliminar</button></td>
            <td><button onClick={() => onEdit(todo)}>Editar</button></td>
          </tr>
        })}
      </tbody>
    </table>
  </div>
}

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Store.Provider value={{ state, dispatch }}>
    {children}
  </Store.Provider>

}

function App() {
  return <StoreProvider>
    <h3>To-Do List</h3>
    <Form />
    <List />
  </StoreProvider>
}

export default App;
