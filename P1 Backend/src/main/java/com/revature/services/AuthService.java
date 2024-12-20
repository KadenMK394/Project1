package com.revature.services;

import com.revature.DAOs.AuthDAO;
import com.revature.models.DTOs.IncomingUserDTO;
import com.revature.models.DTOs.LoginDTO;
import com.revature.models.DTOs.OutgoingUserDTO;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final AuthDAO authDAO;

    @Autowired
    public AuthService(AuthDAO authDAO) {
        this.authDAO = authDAO;
    }

    //Logged out - Insert a new User (create a new account)
    public User insertUser(IncomingUserDTO userDTO){
        if(userDTO.getFirstName() == null || userDTO.getFirstName().isBlank()){
            throw new IllegalArgumentException("Please provide a first name.");
        }
        if(userDTO.getLastName() == null || userDTO.getLastName().isBlank()){
            throw new IllegalArgumentException("Please provide a last name.");
        }
        if(userDTO.getUsername() == null || userDTO.getUsername().isBlank()){
            throw new IllegalArgumentException("Please provide a username.");
        }
        //TODO: Throw error if username already in use
        if(userDTO.getPassword() == null || userDTO.getPassword().isBlank()){
            throw new IllegalArgumentException("Please provide a password.");
        }

        User user = new User(0, userDTO.getFirstName(), userDTO.getLastName(), userDTO.getUsername(), userDTO.getPassword(), userDTO.getRole());

        //TODO: apply an empty reimbursement list (?)

        return authDAO.save(user);
    }

    //Logged out - Verify User (login)
    //method that takes in a username/password and returns the matching User if found
    public OutgoingUserDTO login(LoginDTO loginDTO){
        if(loginDTO.getUsername() == null || loginDTO.getUsername().isBlank()){
            throw new IllegalArgumentException("Please provide a username.");
        }
        if(loginDTO.getPassword() == null || loginDTO.getPassword().isBlank()){
            throw new IllegalArgumentException("Please provide a password.");
        }
        //TODO: Validate the loginDTO fields
        //Use the DAO to find a User in the DB with info from the DTO
        User user = authDAO.findByUsernameAndPassword(loginDTO.getUsername(), loginDTO.getPassword());

        //If no User is found, throw an exception
        if(user == null){
            //TODO: We could have made a custom "LoginFailedException"
            throw new IllegalArgumentException("No user found with those credentials");
        }
        //Return an OutgoingUserDTO to the Controller
        return new OutgoingUserDTO(user.getUserId(), user.getFirstName(), user.getLastName(), user.getUsername(), user.getRole());
    }

    //OPTIONAL: Logout

}
