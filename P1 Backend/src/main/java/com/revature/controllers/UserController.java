package com.revature.controllers;

import com.revature.models.DTOs.OutgoingUserDTO;
import com.revature.models.User;
import com.revature.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    //A method that gets all Users from DB, returning a List of OutgoingUserDTOs
    @GetMapping
    public ResponseEntity<List<OutgoingUserDTO>> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @DeleteMapping
    public ResponseEntity<User> deleteUser(@RequestBody int userId){
        return ResponseEntity.ok(userService.deleteUser(userId));
    }

    @PatchMapping("/role/{userId}")
    public ResponseEntity<User> promoteUser(@PathVariable int userId){
        return ResponseEntity.accepted().body(userService.promoteUser(userId));
    }

    @PatchMapping("/role/{userId}")
    public ResponseEntity<User> demoteUser(@PathVariable int userId){
        return ResponseEntity.accepted().body(userService.demoteUser(userId));
    }
}
