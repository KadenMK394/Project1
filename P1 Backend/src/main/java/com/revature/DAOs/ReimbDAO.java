package com.revature.DAOs;

import com.revature.models.Reimbursement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReimbDAO extends JpaRepository<Reimbursement, Integer> {
    public List<Reimbursement> findByUser_UserId(int userId);
}
