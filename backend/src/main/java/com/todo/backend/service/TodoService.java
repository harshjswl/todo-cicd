package com.todo.backend.service;

import com.todo.backend.entity.Todo;
import com.todo.backend.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {


    @Autowired
    private TodoRepository repo;


    public Todo save(Todo todo) { return repo.save(todo); }
    public List<Todo> getAll() { return repo.findAll(); }
    public Todo update(Long id, Todo t) {
        Todo old = repo.findById(id).orElseThrow();
        old.setTitle(t.getTitle());
        old.setDescription(t.getDescription());
        old.setCompleted(t.isCompleted());
        return repo.save(old);
    }
    public void delete(Long id) { repo.deleteById(id); }
}