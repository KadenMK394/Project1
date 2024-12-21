package com.revature.controllers;

import com.revature.models.DTOs.IncomingUserDTO;
import com.revature.models.DTOs.LoginDTO;
import com.revature.models.DTOs.OutgoingUserDTO;
import com.revature.models.User;
import com.revature.services.AuthService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(value = "http://localhost:5173", allowCredentials = "true")
public class AuthController {
    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    //A method that inserts a new User into the DB
    @PostMapping("/register")
    public ResponseEntity<User> insertUser(@RequestBody IncomingUserDTO userDTO, HttpSession session){
        userDTO.setRole("Employee");
        User user = authService.insertUser(userDTO);
        session.setAttribute("userId", user.getUserId());
        session.setAttribute("firstName", user.getFirstName());
        session.setAttribute("lastName", user.getLastName());
        session.setAttribute("username", user.getUsername());
        session.setAttribute("role", user.getRole());

        System.out.println("User " + session.getAttribute("username") + " registered!");
        return ResponseEntity.status(201).body(user);
    }

    @PostMapping
    public ResponseEntity<OutgoingUserDTO> login(@RequestBody LoginDTO loginDTO, HttpSession session){
        OutgoingUserDTO user = authService.login(loginDTO);

        session.setAttribute("userId", user.getUserId());
        session.setAttribute("firstName", user.getFirstName());
        session.setAttribute("lastName", user.getLastName());
        session.setAttribute("username", user.getUsername());
        session.setAttribute("role", user.getRole());

        System.out.println("User " + session.getAttribute("username") + " logged in!");

        return ResponseEntity.ok(user);
    }
}
