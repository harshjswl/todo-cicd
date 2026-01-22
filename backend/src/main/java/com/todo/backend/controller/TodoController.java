package com.todo.backend.controller;

import com.todo.backend.entity.Todo;
import com.todo.backend.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin("*")
public class TodoController {


    @Autowired
    private TodoService service;


    @PostMapping
    public Todo add(@RequestBody Todo t) { return service.save(t); }


    @GetMapping
    public List<Todo> all() { return service.getAll(); }


    @PutMapping("/{id}")
    public Todo update(@PathVariable Long id, @RequestBody Todo t) {
        return service.update(id, t);
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}