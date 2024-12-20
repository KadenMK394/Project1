package com.revature.aspects;

import jakarta.servlet.http.HttpSession;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect
@Component
public class AuthAspect {
    @Before("within(com.revature.controllers.*)" + "&& !execution(* com.revature.controllers.AuthController.*(..))")
    public void checkLoggedIn(){
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpSession session = attr.getRequest().getSession(false);

        if (session == null || session.getAttribute("userId") == null) {
            throw new IllegalArgumentException("User is not logged in");
        }
    }
    @Before("@annotation(AdminOnly)")
    public void checkAdmin(){
        if(!"manager".equals(((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
                .getRequest().getSession().getAttribute("role"))){

            throw new IllegalArgumentException("User is not a manager!");

        }

    }
}
