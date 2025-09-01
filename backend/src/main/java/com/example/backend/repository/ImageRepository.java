package com.example.backend.repository;


import com.example.backend.model.Image;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


@Document
public interface ImageRepository extends MongoRepository<Image, String> {
    List<Image> findByUserId(String userid);

}