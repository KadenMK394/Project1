package com.revature.services;

import com.revature.DAOs.ReimbDAO;
import com.revature.DAOs.UserDAO;
import com.revature.models.DTOs.IncomingReimbDTO;
import com.revature.models.DTOs.OutgoingReimbDTO;
import com.revature.models.Reimbursement;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
    public Reimbursement createReimb(IncomingReimbDTO reimbDTO){
        /*TODO: Throw errors if:
         * Any data is blank
         * */
        Reimbursement reimbursement = new Reimbursement(0, reimbDTO.getDescription(), reimbDTO.getAmount(), reimbDTO.getStatus(), null);
        int userId = reimbDTO.getUserId();
        User user = userDAO.findById(userId).orElseThrow(() -> {
           return new IllegalArgumentException("No User found with ID " + userId);
        });
        reimbursement.setUser(user);
        return reimbDAO.save(reimbursement);
    }

    //Get a list of Reimbursements for a specific User
    public List<OutgoingReimbDTO> getAllUserReimbs(int userId){
        List<OutgoingReimbDTO> userReimbs = new ArrayList<OutgoingReimbDTO>();
        List<Reimbursement> reimbursements = reimbDAO.findByUser_UserId(userId);
        for(Reimbursement reimb: reimbursements){
            userReimbs.add(new OutgoingReimbDTO(reimb.getReimbId(), reimb.getDescription(), reimb.getAmount(), reimb.getStatus(), reimb.getUser()));
        }
        return userReimbs;
    }

    //Get a list of Reimbursements for a specific User that are pending
    public List<OutgoingReimbDTO> getAllUserPending(int userId){
        List<OutgoingReimbDTO> userPendingReimbs = new ArrayList<OutgoingReimbDTO>();
        List<Reimbursement> reimbursements = reimbDAO.findByUser_UserId(userId);
        for(Reimbursement reimb: reimbursements) {
            if (reimb.getStatus().equals("Pending")) {
                userPendingReimbs.add(new OutgoingReimbDTO(reimb.getReimbId(), reimb.getDescription(), reimb.getAmount(), reimb.getStatus(), reimb.getUser()));
            }
        }
        return userPendingReimbs;
    }

    //OPTIONAL: Update the description of a pending Reimbursement
    public Reimbursement updateReimbDesc(int reimbId, String newDescription){
        //TODO: error handling to make sure new description is present/valid
        //TODO: make sure the new description isn't the old description
        Reimbursement reimbursement = reimbDAO.findById(reimbId).orElseThrow(() -> {
            return new IllegalArgumentException("No Reimbursement found with ID " + reimbId);
        });
        reimbursement.setDescription(newDescription);
        return reimbDAO.save(reimbursement);
    }

    //Own choice: delete a reimbursement
    public Reimbursement deleteReimb(int reimbId){
        Reimbursement reimbursement = reimbDAO.findById(reimbId).orElseThrow(() -> {
            return new IllegalArgumentException("No Reimbursement found with ID " + reimbId);
        });
        reimbDAO.delete(reimbursement);
        return reimbursement;
    }

    //Helper method: delete all reimbursements belonging to a certain user
    public List<Reimbursement> deleteAllUserReimbs(int userId){
        List<Reimbursement> reimbursements = reimbDAO.findByUser_UserId(userId);
        for(Reimbursement reimb: reimbursements) {
            reimbDAO.delete(reimb);
        }
        return reimbursements;
    }

    //Manager - get a list of all Reimbursements
    public List<OutgoingReimbDTO> getAllReimbs(){
        List<OutgoingReimbDTO> outgoingReimbs = new ArrayList<OutgoingReimbDTO>();
        List<Reimbursement> reimbursements = reimbDAO.findAll();
        for(Reimbursement reimb: reimbursements){
            outgoingReimbs.add(new OutgoingReimbDTO(reimb.getReimbId(), reimb.getDescription(), reimb.getAmount(), reimb.getStatus(), reimb.getUser()));
        }
        return outgoingReimbs;
    }
    //Manager - get a list of all Reimbursements that are pending
    public List<OutgoingReimbDTO> getAllPending(){
        List<OutgoingReimbDTO> pendingReimbs = new ArrayList<OutgoingReimbDTO>();
        List<Reimbursement> reimbursements = reimbDAO.findAll();
        for(Reimbursement reimb: reimbursements){
            if (reimb.getStatus().equals("Pending")) {
                pendingReimbs.add(new OutgoingReimbDTO(reimb.getReimbId(), reimb.getDescription(), reimb.getAmount(), reimb.getStatus(), reimb.getUser()));
            }
        }
        return pendingReimbs;
    }

}
