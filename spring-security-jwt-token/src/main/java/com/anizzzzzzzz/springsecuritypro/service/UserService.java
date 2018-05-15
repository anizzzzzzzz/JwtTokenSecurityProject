package com.anizzzzzzzz.springsecuritypro.service;

import com.anizzzzzzzz.springsecuritypro.model.User;

public interface UserService {
    void signUp(User user);

    User findByUsername(String username);
}
