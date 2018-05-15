package com.anizzzzzzzz.springsecuritypro.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private Long id;
    private String username;
    private String password;

    public User(String username,String password){
        this.username=username;
        this.password=password;
    }
}
