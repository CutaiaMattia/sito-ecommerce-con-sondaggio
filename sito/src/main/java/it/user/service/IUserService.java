package it.user.service;

import it.user.model.CambioPassword;
import it.user.model.LoginUser;
import it.user.model.User;
import it.user.model.UserFE;
import it.user.model.response.ResponseUser;

import java.util.List;
public interface IUserService {
    void sendEmail(String recipient, String token);
    User findByEmail( String email);
    ResponseUser save(UserFE user);
    List<User> getAll();

    ResponseUser validationLogin( LoginUser user);

    ResponseUser getAnagraficaByEmail(String email);

     ResponseUser addItem(String email ,int idProdotto);
    ResponseUser attivaAccount(String email,String token);
    ResponseUser aggiornaTokenEDataTokenEdInviaEmail(String email);
    ResponseUser updatePassword(String email, CambioPassword password);
    ResponseUser validaEmail(String email);
    void sendEmail(String recipient);
     ResponseUser addItemsFromString(String email, String idProdotti);
    ResponseUser removeItem(String email, int idProdotto);
}
