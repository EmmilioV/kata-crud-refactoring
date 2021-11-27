package co.com.sofka.crud.services;

import co.com.sofka.crud.dto.TodoDTO;
import co.com.sofka.crud.models.Todo;
import co.com.sofka.crud.repositories.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TodoService {

    @Autowired
    private TodoRepository repository;

    public Iterable<Todo> list(){
        return repository.findAll();
    }

    public TodoDTO save(TodoDTO todoDTO){
        Todo todo = convertToTodo(todoDTO);
        return convertToTodoDTO(repository.save(todo));
    }

    public void delete(Long id){
        Todo todo = convertToTodo(get(id));
        repository.delete(todo);
    }

    public TodoDTO get(Long id){
         return convertToTodoDTO(repository.findById(id).orElseThrow());
    }

    public TodoDTO convertToTodoDTO(Todo todo){
        TodoDTO todoDTO = new TodoDTO();

        todoDTO.setTodoId(todo.getId());
        todoDTO.setName(todo.getName());
        todoDTO.setIsCompleted(todo.getIsCompleted());
        todoDTO.setGroupListId(todo.getGroupListId());

        return todoDTO;
    }

    public Todo convertToTodo(TodoDTO todoDTO){
        Todo todo = new Todo();

        if(todoDTO.getTodoId()!=null)
        {
            todo.setId(todoDTO.getTodoId());
        }
        todo.setName(todoDTO.getName());
        todo.setIsCompleted(todoDTO.getIsCompleted());
        todo.setGroupListId(todoDTO.getGroupListId());

        return todo;
    }

}
