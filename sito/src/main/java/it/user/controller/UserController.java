package it.user.controller;

import it.user.model.LoginUser;
import it.user.model.UserFE;
import it.user.model.response.ResponseUser;
import it.user.service.IUserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(allowedHeaders = {"*"})
public class UserController {

    private IUserService iUserService;

    public UserController(IUserService iUserService) {
        this.iUserService = iUserService;
    }

    @PostMapping
    public ResponseUser save(@RequestBody UserFE user) throws Exception {
        return iUserService.save(user);
    }


    @PostMapping("/validate")
    public ResponseUser validationLogin(@RequestBody LoginUser user) {
        return iUserService.validationLogin(user);
    }


    @GetMapping("/{email}")
    public ResponseUser getAnagraficaByEmail(@PathVariable String email) {
        return iUserService.getAnagraficaByEmail(email);
    }
}