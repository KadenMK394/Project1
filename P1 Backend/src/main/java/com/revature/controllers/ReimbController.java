package com.revature.controllers;

import com.revature.services.ReimbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reimbursements")
public class ReimbController {
    private final ReimbService reimbService;

    @Autowired
    public ReimbController(ReimbService reimbService) {
        this.reimbService = reimbService;
    }
}
