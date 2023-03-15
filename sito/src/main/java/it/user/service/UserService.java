package it.user.service;

import it.user.model.User;
import it.user.model.UserFE;
import it.user.model.response.ResponseUser;
import it.user.repository.IUserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;


@Service
public class UserService implements IUserService{

    private PasswordEncoder passwordEncoder;
    private IUserRepository iUserRepository;

    public UserService(IUserRepository iUserRepository,PasswordEncoder passwordEncoder) {
        this.iUserRepository = iUserRepository;
        this.passwordEncoder = passwordEncoder;
    }



    @Override
    public ResponseUser save(UserFE user) throws Exception {
        ResponseUser ru = new ResponseUser();
        if(iUserRepository.findById(user.getId()).isPresent()) {
            return null;
        } else {
            User userToSave = new User();
            userToSave.setId(user.getId());
            if(iUserRepository.findByEmail(user.getEmail().get("mail")).isPresent()){
                ru.setMessage("EMAIL ESISTENTE");
                return ru;
            } else {
                if(user.getEmail().get("mail").matches("^[A-Za-z0-9+_.]+@[A-Za-z0-9.]+\\.[A-Za-z]{2,3}$")) {
                    userToSave.setEmail(user.getEmail().get("mail"));
                    userToSave.setCitta(user.getCitta());
                    userToSave.setNome(user.getNome());
                    userToSave.setCognome(user.getCognome());
                    userToSave.setIndirizzo(user.getIndirizzo());
                    userToSave.setDataNascita(user.getDataNascita());
                    userToSave.setDataCreazione(LocalDate.now());
                    userToSave.setDataModifica(LocalDate.now());

                    userToSave.setPassword(passwordEncoder.encode(user.getPassword().get("pwd")));

                    System.out.println(userToSave.getPassword());

                    iUserRepository.save(userToSave);
                    ru.setBody(userToSave);
                    ru.setResponse(HttpStatus.OK);
                    ru.setMessage("REGISTRAZIONE AVVENUTA CORRETTAMENTE");
                    return ru;

                }else {
                    ru.setResponse(HttpStatus.BAD_REQUEST);
                    ru.setMessage("EMAIL NON VALIDA");
                    return ru;
                }

            }
        }
    }

    @Override
    public List<User> getAll(){
        return iUserRepository.findAll();
    }
}
