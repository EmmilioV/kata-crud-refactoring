import React from 'react';
import Form from './components/Form';
import List from './components/List';
import { StoreProvider } from './components/Store';

const HOST_API = "http://localhost:8080/api";

function App() {
  return <StoreProvider>
    <h3>To-Do List</h3>
    <Form HOST_API={HOST_API}/>
    <List HOST_API={HOST_API}/>
  </StoreProvider>
}

export default App;
