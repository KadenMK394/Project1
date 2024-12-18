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
        //TODO: make sure the userDTO fields are present and valid
        //TODO: make sure the incoming username is unique
        /*TODO: Throw errors if:
         * First name is blank or null
         * Last name is blank or null
         * Username is blank or null
         * Password is blank or null
         * Username already exists
         * */
        User user = new User(0, userDTO.getFirstName(), userDTO.getLastName(), userDTO.getUsername(), userDTO.getPassword(), userDTO.getRole(), null);

        //TODO: apply an empty reimbursement list or populate reimbursements (?)

        return authDAO.save(user);
    }

    //Logged out - Verify User (login)
    //method that takes in a username/password and returns the matching User if found
    public OutgoingUserDTO login(LoginDTO loginDTO){
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
