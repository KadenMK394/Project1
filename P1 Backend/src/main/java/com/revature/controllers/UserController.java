package com.revature.controllers;

import com.revature.annotations.AdminOnly;
import com.revature.models.DTOs.OutgoingUserDTO;
import com.revature.models.Reimbursement;
import com.revature.models.User;
import com.revature.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(value = "http://localhost:5173", allowCredentials = "true")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    //A method that gets all Users from DB, returning a List of OutgoingUserDTOs
    @GetMapping
    @AdminOnly
    public ResponseEntity<List<OutgoingUserDTO>> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @DeleteMapping("/{userId}")
    @AdminOnly
    public ResponseEntity<User> deleteUser(@PathVariable int userId){
        return ResponseEntity.ok(userService.deleteUser(userId));
    }

    @PatchMapping("/{userId}")
    @AdminOnly
    public ResponseEntity<User> updateReimbStatus(@PathVariable int userId, @RequestBody String newRole){
        return ResponseEntity.accepted().body(userService.updateUserRole(userId, newRole));
    }
}
