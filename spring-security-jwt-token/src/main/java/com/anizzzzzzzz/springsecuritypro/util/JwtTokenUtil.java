package com.anizzzzzzzz.springsecuritypro.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.anizzzzzzzz.springsecuritypro.constant.SecurityConstant.EXPIRATION_TIME;
import static com.anizzzzzzzz.springsecuritypro.constant.SecurityConstant.SECRET;

@Component
public class JwtTokenUtil {
    public String generateJwtToken(UserDetails userDetails){
        Map<String,Object> claims=new HashMap<>();
        return dogenerateJwtToken(claims,userDetails.getUsername());
    }

    public String generateJwtToken(String username){
        return dogenerateJwtToken(username);
    }

    public String dogenerateJwtToken(Map<String,Object> claims, String subject){
        return Jwts.builder()
                .setSubject(subject)
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512,SECRET)
                .compact();
    }

    public String dogenerateJwtToken(String subject){
        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512,SECRET)
                .compact();
    }
}
