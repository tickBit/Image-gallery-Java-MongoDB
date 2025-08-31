package com.example.backend.dto;

public class RegisterRequest {

    private String username;
    private String password;
    private String email;

    public RegisterRequest(String username, String password, String email) {

        this.username = username;
        this.password = password;
        this.email = email;
    }

    public RegisterRequest() {

    }

    public String getUsername() {
        return this.username;
    }

    public String getPassword() {
        return this.password;
    }

    public String getEmail() {
        return this.email;
    }


    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}