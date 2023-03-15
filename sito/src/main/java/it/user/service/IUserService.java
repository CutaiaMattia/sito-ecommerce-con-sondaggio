package it.user.service;

import it.user.model.User;
import it.user.model.UserFE;
import it.user.model.response.ResponseUser;

import java.util.List;

public interface IUserService {

    ResponseUser save(UserFE user) throws Exception;
    public List<User> getAll();

}
