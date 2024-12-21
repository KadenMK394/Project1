package com.revature.aspects;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect
@Component
public class RoleAspect{
    @Before("@annotation(com.revature.annotations.AdminOnly)")
    public void checkAdmin(){
        if(!"Manager".equals(((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
                .getRequest().getSession().getAttribute("role"))){

            throw new IllegalArgumentException("User is not a manager!");
        }
    }
}