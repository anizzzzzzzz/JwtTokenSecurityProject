package com.anizzzzzzzz.springsecuritypro.service.impl;

import com.anizzzzzzzz.springsecuritypro.model.Task;
import com.anizzzzzzzz.springsecuritypro.repository.TaskRepository;
import com.anizzzzzzzz.springsecuritypro.service.MongoCounterService;
import com.anizzzzzzzz.springsecuritypro.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;

    private final MongoCounterService mongoCounterService;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository, MongoCounterService mongoCounterService) {
        this.taskRepository = taskRepository;
        this.mongoCounterService = mongoCounterService;
    }

    @Override
    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    @Override
    public Optional<Task> findOne(Long id) {
        return taskRepository.findById(id);
    }

    @Override
    public Task save(Task task) {
        task.setId(mongoCounterService.getNextSequence("task"));
        return taskRepository.save(task);
    }

    @Override
    public Task modify(Long id,Task task) {
        Optional<Task> task1=taskRepository.findById(id);

        if(task1.isPresent()){
            Task task2=task1.get();
            task2.setTitle(task.getTitle());
            task2.setDescription(task.getDescription());
            return taskRepository.save(task2);
        }
        return null;
    }

    @Override
    public void delete(Long id) {
        taskRepository.deleteById(id);
    }
}
