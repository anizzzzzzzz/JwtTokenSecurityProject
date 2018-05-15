package com.anizzzzzzzz.springsecuritypro.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "counter")
public class Counter {
    @Id
    private String id;
    private long seq;
}
