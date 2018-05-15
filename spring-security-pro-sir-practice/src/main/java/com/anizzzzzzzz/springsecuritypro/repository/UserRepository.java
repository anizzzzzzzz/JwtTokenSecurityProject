package com.anizzzzzzzz.springsecuritypro.repository;

import com.anizzzzzzzz.springsecuritypro.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User,Long> {
    User findByUsername(String username);
}
