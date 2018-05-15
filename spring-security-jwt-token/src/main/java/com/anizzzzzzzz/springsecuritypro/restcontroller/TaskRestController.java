package com.anizzzzzzzz.springsecuritypro.restcontroller;

import com.anizzzzzzzz.springsecuritypro.model.Task;
import com.anizzzzzzzz.springsecuritypro.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskRestController {
    @Autowired
    private TaskService taskService;

    @GetMapping
    public ResponseEntity<List<Task>> findAll(){
        return new ResponseEntity<>(taskService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> findOne(@PathVariable Long id){
        if(taskService.findOne(id).isPresent()){
            return new ResponseEntity<>(taskService.findOne(id).get(), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping
    public ResponseEntity<Task> save(@RequestBody Task task){
        return new ResponseEntity<>(taskService.save(task), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> modify(@PathVariable Long id,@RequestBody Task task){
        return new ResponseEntity<>(taskService.modify(id, task), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        taskService.delete(id);
    }
}
