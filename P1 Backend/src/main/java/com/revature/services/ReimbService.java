package com.revature.services;

import com.revature.DAOs.ReimbDAO;
import com.revature.DAOs.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReimbService {
    private final ReimbDAO reimbDAO;
    private final UserDAO userDAO;

    @Autowired
    public ReimbService(ReimbDAO reimbDAO, UserDAO userDAO) {
        this.reimbDAO = reimbDAO;
        this.userDAO = userDAO;
    }

    //Insert a new Reimbursement

    //Get a list of Reimbursements for a specific User

    //Get a list of Reimbursements for a specific User that are pending

    //OPTIONAL: Update the description of a pending Reimbursement

    //Manager - get a list of all Reimbursements

    //Manager - get a list of all Reimbursements that are pending

}
