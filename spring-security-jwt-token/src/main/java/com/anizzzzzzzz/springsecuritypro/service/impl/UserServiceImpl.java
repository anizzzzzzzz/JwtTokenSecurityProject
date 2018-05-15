package com.anizzzzzzzz.springsecuritypro.service.impl;

import com.anizzzzzzzz.springsecuritypro.model.User;
import com.anizzzzzzzz.springsecuritypro.repository.UserRepository;
import com.anizzzzzzzz.springsecuritypro.service.MongoCounterService;
import com.anizzzzzzzz.springsecuritypro.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    private final MongoCounterService mongoCounterService;

    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, MongoCounterService mongoCounterService, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.mongoCounterService = mongoCounterService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void signUp(User user) {
        if(user!=null) {
            user.setId(mongoCounterService.getNextSequence("user"));
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
        }
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
