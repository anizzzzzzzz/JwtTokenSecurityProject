package com.anizzzzzzzz.springsecuritypro.restcontroller;

import com.anizzzzzzzz.springsecuritypro.dto.JWTAuthenticationResponse;
import com.anizzzzzzzz.springsecuritypro.model.User;
import com.anizzzzzzzz.springsecuritypro.service.UserService;
import com.anizzzzzzzz.springsecuritypro.service.impl.UserDetailsServiceImpl;
import com.anizzzzzzzz.springsecuritypro.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserRestController {
    private final UserService userService;

    private final BCryptPasswordEncoder passwordEncoder;

    private final JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    public UserRestController(UserService userService, BCryptPasswordEncoder passwordEncoder, JwtTokenUtil jwtTokenUtil) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping("/sign-up")
    public void signUp(@RequestBody User user){
        userService.signUp(user);
    }

    @PostMapping("/login")
    public ResponseEntity<JWTAuthenticationResponse> login(@RequestBody User user) throws Exception {
        String username=user.getUsername();
        String password = user.getPassword();

        if (password == null || username == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        User user1=userService.findByUsername(username);

        if(user1!=null){
            if(passwordEncoder.matches(password,user1.getPassword())) {
                return new ResponseEntity<>(new JWTAuthenticationResponse(
                        jwtTokenUtil.generateJwtToken(username)),
                        HttpStatus.OK);
            }
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
