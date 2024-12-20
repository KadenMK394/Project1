package com.revature.services;

import com.revature.DAOs.ReimbDAO;
import com.revature.DAOs.UserDAO;
import com.revature.models.DTOs.IncomingReimbDTO;
import com.revature.models.DTOs.OutgoingReimbDTO;
import com.revature.models.Reimbursement;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public Reimbursement createReimb(IncomingReimbDTO reimbDTO, int userId){
        if(reimbDTO.getDescription() == null || reimbDTO.getDescription().isBlank()){
            throw new IllegalArgumentException("Please provide a description.");
        }
        if(reimbDTO.getAmount() <= 0){
            throw new IllegalArgumentException("Please provide a valid amount.");
        }
        Reimbursement reimbursement = new Reimbursement(0, reimbDTO.getDescription(), reimbDTO.getAmount(), reimbDTO.getStatus(), null);

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
            if (reimb.getStatus().equals("pending")) {
                userPendingReimbs.add(new OutgoingReimbDTO(reimb.getReimbId(), reimb.getDescription(), reimb.getAmount(), reimb.getStatus(), reimb.getUser()));
            }
        }
        return userPendingReimbs;
    }

    //OPTIONAL: Update the description of a pending Reimbursement
    public Reimbursement updateReimbDesc(int reimbId, String newDescription){
        if(newDescription == null || newDescription.isBlank()){
            throw new IllegalArgumentException("Please provide a description.");
        }
        Reimbursement reimbursement = reimbDAO.findById(reimbId).orElseThrow(() -> {
            return new IllegalArgumentException("No Reimbursement found with ID " + reimbId);
        });
        if(reimbursement.getDescription().equals(newDescription)){
            throw new IllegalArgumentException("Description was not changed.");
        }
        reimbursement.setDescription(newDescription);
        return reimbDAO.save(reimbursement);
    }

    //Own choice: delete a reimbursement
    public Reimbursement deleteReimb(int reimbId, int userId){
        System.out.println("UserId is " + userId);
        Reimbursement reimbursement = reimbDAO.findById(reimbId).orElseThrow(() -> {
            return new IllegalArgumentException("No Reimbursement found with ID " + reimbId);
        });
        User user = userDAO.findById(userId).orElseThrow(() -> {
            return new IllegalArgumentException("No User found with ID " + userId);
        });

        user.getReimbs().clear();
        userDAO.save(user);

        reimbDAO.delete(reimbursement);
        return reimbursement;
    }

    //Helper method: delete all reimbursements belonging to a certain user
    public void deleteAllUserReimbs(int userId){
        List<Reimbursement> reimbursements = reimbDAO.findByUser_UserId(userId);
        for(Reimbursement reimb: reimbursements) {
            reimbDAO.delete(reimb);
        }
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
            if (reimb.getStatus().equals("pending")) {
                pendingReimbs.add(new OutgoingReimbDTO(reimb.getReimbId(), reimb.getDescription(), reimb.getAmount(), reimb.getStatus(), reimb.getUser()));
            }
        }
        return pendingReimbs;
    }

    //Manager - approve or deny a Reimbursement
    public Reimbursement updateReimbStatus(int reimbId, String newStatus){
        Reimbursement reimbursement = reimbDAO.findById(reimbId).orElseThrow(() -> {
            return new IllegalArgumentException("No Reimbursement found with ID " + reimbId);
        });
        reimbursement.setStatus(newStatus);
        return reimbDAO.save(reimbursement);
    }
}
