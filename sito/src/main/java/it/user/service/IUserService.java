package it.user.service;

import it.user.model.LoginUser;
import it.user.model.User;
import it.user.model.UserFE;
import it.user.model.response.ResponseUser;
import java.util.List;
public interface IUserService {

    User findByEmail( String email);
    ResponseUser save(UserFE user) throws Exception;
    List<User> getAll();

    ResponseUser validationLogin( LoginUser user);

    ResponseUser getAnagraficaByEmail(String email);

}
