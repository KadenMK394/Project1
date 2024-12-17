package com.revature.services;

import com.revature.DAOs.ReimbDAO;
import com.revature.DAOs.UserDAO;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserDAO userDAO;
    private final ReimbDAO reimbDAO;

    @Autowired
    public UserService(UserDAO userDAO, ReimbDAO reimbDAO) {
        this.userDAO = userDAO;
        this.reimbDAO = reimbDAO;
    }

    //Logged out - Insert a new User (create a new account)
    public User insertUser(User user){
        /*Throw errors if:
        * First name is blank or null
        * Last name is blank or null
        * Username is blank or null
        * Password is blank or null
        * Username already exists
        * */
        return userDAO.save(user);
    }
    //Manager - get a list of all Users
    public List<User> getAllUsers(){
        //Throw an error if there are no records (shouldn't ever happen)
        return userDAO.findAll();
    }
    //Manager - delete a User (and delete their Reimbursements)
    public User deleteUser(int userId){
        User user = userDAO.findById(userId).orElseThrow(() -> {
           return new IllegalArgumentException("No User found with ID " + userId);
        });
        userDAO.delete(user);
        return user;
    }

    //OPTIONAL: Update an employee User's Role to manager

    //Logged out - Verify User (login)

    //OPTIONAL: Logout

    //OPTIONAL: "Logging of the Service layer with logback"
    //OPTIONAL: "Test Suites for the Service layer with JUnit"
}
