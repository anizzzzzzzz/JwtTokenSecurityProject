package com.anizzzzzzzz.springsecuritypro.service.impl;

import com.anizzzzzzzz.springsecuritypro.model.Counter;
import com.anizzzzzzzz.springsecuritypro.service.MongoCounterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Service
public class MongoCounterServiceImpl implements MongoCounterService {
    private final MongoOperations mongoOperations;

    @Autowired
    public MongoCounterServiceImpl(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }

    @Override
    public long getNextSequence(String collectionName) {
        Counter counter = mongoOperations.findAndModify(
                query(where("_id").is(collectionName)),
                new Update().inc("seq", 1),
                options().returnNew(true).upsert(true),
                Counter.class);

        return counter.getSeq();
    }
}
