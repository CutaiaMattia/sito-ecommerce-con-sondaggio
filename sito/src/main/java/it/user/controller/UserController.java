package it.user.controller;

import it.user.model.CambioPassword;
import it.user.model.LoginUser;
import it.user.model.User;
import it.user.model.UserFE;
import it.user.model.response.RequestItemAdd;
import it.user.model.response.ResponseUser;
import it.user.service.IUserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(allowedHeaders = {"*"})
public class UserController {

    private final static String subject = "Conferma email";
    private final static String body = "clicca qui!";
    private IUserService iUserService;

    public UserController(IUserService iUserService ) {
        this.iUserService = iUserService;

    }

    @PostMapping
    public ResponseUser save(@RequestBody UserFE user)  {
        ResponseUser ru = iUserService.save(user);
        if(ru.getBody() !=null) {
            User u = (User) ru.getBody();
            iUserService.sendEmail(user.getEmail().get("mail"), u.getToken());
        }
        return ru;
    }


    @PostMapping("/validate")
    public ResponseUser validationLogin(@RequestBody LoginUser user) {
        return iUserService.validationLogin(user);
    }


    @GetMapping("/{email}")
    public ResponseUser getAnagraficaByEmail(@PathVariable String email) {
        return iUserService.getAnagraficaByEmail(email);
    }

    @PutMapping("/add")
    public ResponseUser addItem(@RequestBody RequestItemAdd ria){
        return iUserService.addItem(ria.getEmail(), (Integer) ria.getIdProdotto());
    }
    @PutMapping("/addFromString")
    public ResponseUser addItemFromString(@RequestBody RequestItemAdd ria){
        return iUserService.addItemsFromString(ria.getEmail(),(String)ria.getIdProdotto());
    }

    @PutMapping("/valida/{email}/{token}")
    public ResponseUser attivaAccount( @PathVariable String email, @PathVariable String token){
        return iUserService.attivaAccount(token, email);
    }

    @PutMapping("/generate/{email}")
    public ResponseUser generateToken(@PathVariable String email){
        return iUserService.aggiornaTokenEDataTokenEdInviaEmail(email);
    }



    @GetMapping("/valida-email/{email}")
    public ResponseUser validaEmail(@PathVariable String email){
        ResponseUser ru = iUserService.validaEmail(email);
        if(ru.getMessage().equalsIgnoreCase("email trovata")){
            iUserService.sendEmail(email);
        }
        return ru;
    }

    @PutMapping("/cambia-password/{email}")
    public ResponseUser updatePassword(@PathVariable String  email, @RequestBody CambioPassword password){

        return iUserService.updatePassword(email, password);
    }
}