package com.anizzzzzzzz.springsecuritypro.repository;

import com.anizzzzzzzz.springsecuritypro.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TaskRepository extends MongoRepository<Task,Long> {
}
