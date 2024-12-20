package com.revature.controllers;

import com.revature.annotations.AdminOnly;
import com.revature.models.DTOs.IncomingReimbDTO;
import com.revature.models.DTOs.OutgoingReimbDTO;
import com.revature.models.Reimbursement;
import com.revature.services.ReimbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reimbursements")
@CrossOrigin(value = "http://localhost:5173", allowCredentials = "true")
public class ReimbController {
    private final ReimbService reimbService;

    @Autowired
    public ReimbController(ReimbService reimbService) {
        this.reimbService = reimbService;
    }

    @PostMapping("/{userId}")
    public ResponseEntity<Reimbursement> createReimb(@PathVariable int userId, @RequestBody IncomingReimbDTO reimbDTO){
        Reimbursement reimbursement = reimbService.createReimb(reimbDTO, userId);
        return ResponseEntity.status(201).body(reimbursement);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<OutgoingReimbDTO>> getAllUserReimbs(@PathVariable int userId){
        return ResponseEntity.ok(reimbService.getAllUserReimbs(userId));
    }

    @GetMapping("/{userId}/pending")
    public ResponseEntity<List<OutgoingReimbDTO>> getAllUserPending(@PathVariable int userId){
        return ResponseEntity.ok(reimbService.getAllUserPending(userId));
    }

    @PatchMapping("/{userId}/{reimbId}")
    public ResponseEntity<Reimbursement> updateReimbDesc(@PathVariable int reimbId, @RequestBody String newDesc){
        return ResponseEntity.accepted().body(reimbService.updateReimbDesc(reimbId, newDesc));
    }

    @DeleteMapping("/{userId}/{reimbId}")
    public ResponseEntity<Reimbursement> deleteReimb(@PathVariable int reimbId, @PathVariable int userId){
        return ResponseEntity.accepted().body(reimbService.deleteReimb(reimbId, userId));
    }

    @GetMapping
    @AdminOnly
    public ResponseEntity<List<OutgoingReimbDTO>> getAllReimbs(){
        return ResponseEntity.ok(reimbService.getAllReimbs());
    }

    @GetMapping("/pending")
    @AdminOnly
    public ResponseEntity<List<OutgoingReimbDTO>> getAllPending(){
        return ResponseEntity.ok(reimbService.getAllPending());
    }

    @PatchMapping("/{reimbId}")
    @AdminOnly
    public ResponseEntity<Reimbursement> updateReimbStatus(@PathVariable int reimbId, @RequestBody String newStatus){
        return ResponseEntity.accepted().body(reimbService.updateReimbStatus(reimbId, newStatus));
    }
}
