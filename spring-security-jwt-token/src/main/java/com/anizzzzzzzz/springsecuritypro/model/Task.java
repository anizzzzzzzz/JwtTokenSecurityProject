package com.anizzzzzzzz.springsecuritypro.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Task {
    @Id
    private Long id;
    private String title;
    private String description;
}
