package com.example.backend.controller;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.model.Image;
import com.example.backend.model.User;
import com.example.backend.service.ImageService;
import com.example.backend.service.UserService;


@RestController
@RequestMapping("/api/v1/pics")
@CrossOrigin(origins = "http://localhost:3000") // frontend URL
public class ImageController {

    private final ImageService imageService;
    private final UserService userService;

    public ImageController(ImageService imageService, UserService userService) {
        this.imageService = imageService;
        this.userService = userService;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImg(
            @RequestParam("file") MultipartFile file,
            @RequestParam("description") String description,
            Principal principal
    ) throws IOException {

        // if token actually is expired, this line isn't even reached
        if (principal == null) return ResponseEntity.status(403).body("Forbidden -- not authenticated");

        String username = principal.getName();
        User user = userService.getUser(username);

        Image img = imageService.uploadImage(file.getBytes(), description, user);

        return ResponseEntity.ok(img);
    }

    @GetMapping("/getUserPics")
    public List<Image> getUserPics(Authentication auth) {
        
        String authname = auth.getName();

        return imageService.getUserPics(authname);
      
    }
    
    @DeleteMapping("/deletePic/{id}")
    public void deletepic(@PathVariable("id") String id) {
        
        imageService.deletePicById(id);
    }
    
}
