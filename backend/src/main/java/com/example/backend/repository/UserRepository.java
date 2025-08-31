package com.example.backend.repository;

import java.util.Optional;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.backend.model.User;

@Document
public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByUsername(String username);

}
