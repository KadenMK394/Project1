package com.revature.services;

import com.revature.DAOs.ReimbDAO;
import com.revature.DAOs.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserDAO userDAO;
    private final ReimbDAO reimbDAO;

    @Autowired
    public UserService(UserDAO userDAO, ReimbDAO reimbDAO) {
        this.userDAO = userDAO;
        this.reimbDAO = reimbDAO;
    }
}
