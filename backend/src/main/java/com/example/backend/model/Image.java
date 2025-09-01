package com.example.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "images")
public class Image {

    private String id;

    private String description;

    private byte[] image;

    private User user;

    public Image() {}

    public Image(byte[] image, String description, User user) {
        this.image = image;
        this.description = description;
        this.user = user;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
