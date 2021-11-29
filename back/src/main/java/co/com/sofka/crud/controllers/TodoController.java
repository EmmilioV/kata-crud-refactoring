package co.com.sofka.crud.controllers;

import co.com.sofka.crud.dto.TodoDTO;
import co.com.sofka.crud.services.TodoService;
import co.com.sofka.crud.models.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    @Autowired
    private TodoService service;

    @GetMapping(value = "api/todos")
    public Iterable<Todo> list(){
        return service.list();
    }
    
    @PostMapping(value = "api/todo")
    public TodoDTO save(@RequestBody TodoDTO todoDTO){
        if(todoDTO.getName()!=null || todoDTO.getName().length()!=0)
            return service.save(todoDTO);
        throw new RuntimeException("Tarea vacía");
    }

    @PutMapping(value = "api/todo")
    public TodoDTO update(@RequestBody TodoDTO todoDTO){
        if(todoDTO.getTodoId() != null){
            if((todoDTO.getName()!=null || todoDTO.getName().length()!=0))
                return service.save(todoDTO);
            throw new RuntimeException("No se puede actualizar, campo en blanco");
        }
        throw new RuntimeException("No existe el id para actualizar");
    }

    @DeleteMapping(value = "api/{id}/todo")
    public void delete(@PathVariable("id")Long id){
        service.delete(id);
    }

    @GetMapping(value = "api/{id}/todo")
    public TodoDTO get(@PathVariable("id") Long id){
        return service.get(id);
    }

}
