package it.user.controller;


import it.user.model.User;
import it.user.model.UserFE;
import it.user.model.response.ResponseUser;
import it.user.service.IUserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(allowedHeaders = {"*"})
public class UserController {

    private IUserService iUserService;

    public UserController(IUserService iUserService){
        this.iUserService = iUserService;
    }

    @PostMapping
    public ResponseUser save(@RequestBody UserFE user) throws Exception {
        return iUserService.save(user);
    }
   /*
    @GetMapping
    public List<User> getAll(){
        return iUserService.getAll();
    }
    
    */
}
