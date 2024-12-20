package com.revature.services;

import com.revature.DAOs.UserDAO;
import com.revature.models.DTOs.OutgoingUserDTO;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private final UserDAO userDAO;
    private final ReimbService reimbService;

    @Autowired
    public UserService(UserDAO userDAO, ReimbService reimbService) {
        this.userDAO = userDAO;
        this.reimbService = reimbService;
    }

    //Manager - get a list of all Users
    public List<OutgoingUserDTO> getAllUsers(){
        //TODO: Throw an error if there are no records (shouldn't ever happen)
        List<OutgoingUserDTO> outgoingUsers = new ArrayList<OutgoingUserDTO>();
        List<User> users = userDAO.findAll();
        for(User user: users){
            //TODO: remember to add reimbursements list to outgoing users
            outgoingUsers.add(new OutgoingUserDTO(user.getUserId(), user.getFirstName(), user.getLastName(), user.getUsername(), user.getRole()));
        }
        return outgoingUsers;
    }
    //Manager - delete a User (and delete their Reimbursements)
    public User deleteUser(int userId){
        User user = userDAO.findById(userId).orElseThrow(() -> {
           return new IllegalArgumentException("No User found with ID " + userId);
        });
        reimbService.deleteAllUserReimbs(userId);
        userDAO.delete(user);
        return user;
    }

    //OPTIONAL: Promote or demote a user
    public User updateUserRole(int userId, String newRole){
        User user = userDAO.findById(userId).orElseThrow(() -> {
            return new IllegalArgumentException("No User found with ID " + userId);
        });
        user.setRole(newRole);
        userDAO.save(user);
        return user;
    }
    //OPTIONAL: "Logging of the Service layer with logback"
    //OPTIONAL: "Test Suites for the Service layer with JUnit"
}
