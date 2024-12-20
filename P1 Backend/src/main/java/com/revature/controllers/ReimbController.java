package com.revature.controllers;

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
@CrossOrigin
public class ReimbController {
    private final ReimbService reimbService;

    @Autowired
    public ReimbController(ReimbService reimbService) {
        this.reimbService = reimbService;
    }

    @PostMapping
    public ResponseEntity<Reimbursement> createReimb(@RequestBody IncomingReimbDTO reimbDTO){
        Reimbursement reimbursement = reimbService.createReimb(reimbDTO);
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

    @PatchMapping("/{reimbId}")
    public ResponseEntity<Reimbursement> updateReimbDesc(@PathVariable int reimbId, @RequestBody String newDesc){
        return ResponseEntity.accepted().body(reimbService.updateReimbDesc(reimbId, newDesc));
    }

    @GetMapping
    public ResponseEntity<List<OutgoingReimbDTO>> getAllReimbs(){
        return ResponseEntity.ok(reimbService.getAllReimbs());
    }

    @GetMapping("/pending")
    public ResponseEntity<List<OutgoingReimbDTO>> getAllPending(){
        return ResponseEntity.ok(reimbService.getAllPending());
    }
}
