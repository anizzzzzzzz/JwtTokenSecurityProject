package com.anizzzzzzzz.springsecuritypro.service;

import com.anizzzzzzzz.springsecuritypro.model.Task;

import java.util.List;
import java.util.Optional;

public interface TaskService {
    List<Task> findAll();

    Optional<Task> findOne(Long id);

    Task save(Task task);

    Task modify(Long id,Task task);

    void delete(Long id);
}
