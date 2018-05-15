package com.anizzzzzzzz.springsecuritypro.service;

public interface MongoCounterService {
    long getNextSequence(String collectionName);
}
