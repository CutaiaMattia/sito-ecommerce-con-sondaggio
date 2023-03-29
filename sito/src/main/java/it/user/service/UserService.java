package it.user.service;


import it.user.model.*;
import it.user.model.response.ResponseUser;
import it.user.repository.IUserRepository;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.threeten.bp.temporal.ChronoUnit;
import org.threeten.bp.temporal.TemporalUnit;
import sendinblue.ApiClient;
import sendinblue.ApiException;
import sendinblue.auth.ApiKeyAuth;
import sibApi.TransactionalEmailsApi;
import sibModel.*;

import java.security.SecureRandom;
import java.time.*;
import java.time.temporal.Temporal;
import java.util.*;
import java.util.stream.Collectors;


@Service
public class UserService implements IUserService {

    protected static SecureRandom random = new SecureRandom();
    private PasswordEncoder passwordEncoder;
    private IUserRepository iUserRepository;

    public UserService(IUserRepository iUserRepository, PasswordEncoder passwordEncoder) {
        this.iUserRepository = iUserRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public User findByEmail(String email) {
        if (iUserRepository.findByEmail(email).isPresent()) {
            return iUserRepository.findByEmail(email).get();
        }
        return null;
    }

    @Override
    public ResponseUser save(UserFE user) {
        ResponseUser ru = new ResponseUser();
        if (iUserRepository.findById(user.getId()).isPresent()) {
            return null;
        } else {
            User userToSave = new User();
            userToSave.setId(user.getId());
            if (iUserRepository.findByEmail(user.getEmail().get("mail")).isPresent()) {
                ru.setMessage("EMAIL ESISTENTE");
                return ru;
            } else {
                if (user.getEmail().get("mail").matches("^[A-Za-z0-9+_.]+@[A-Za-z0-9.]+\\.[A-Za-z]{2,3}$")) {
                    userToSave.setEmail(user.getEmail().get("mail"));
                    userToSave.setCitta(user.getCitta());
                    userToSave.setNome(user.getNome());
                    userToSave.setCognome(user.getCognome());
                    userToSave.setIndirizzo(user.getIndirizzo());
                    userToSave.setDataNascita(user.getDataNascita());
                    userToSave.setDataCreazione(LocalDate.now());
                    userToSave.setDataModifica(LocalDate.now());
                    userToSave.setIdProdotti("");
                    userToSave.setPassword(passwordEncoder.encode(user.getPassword().get("pwd")));
                    userToSave.setAttivo(false);

                    userToSave.setToken(generateToken());
                    userToSave.setDataToken(LocalDateTime.now());

                    iUserRepository.save(userToSave);
                    ru.setBody(userToSave);
                    ru.setResponse(HttpStatus.OK);
                    ru.setMessage("REGISTRAZIONE AVVENUTA CORRETTAMENTE");
                    return ru;

                } else {
                    ru.setResponse(HttpStatus.BAD_REQUEST);
                    ru.setMessage("EMAIL NON VALIDA");
                    return ru;
                }

            }
        }
    }

    @Override
    public List<User> getAll() {
        return iUserRepository.findAll();
    }

    @Override
    public ResponseUser validationLogin(LoginUser user) {
        ResponseUser ru = new ResponseUser();
        Optional<User> userToVerify = iUserRepository.findByEmail(user.getEmail());
        if (userToVerify.isPresent()) {
            if (passwordEncoder.matches(user.getPassword(), userToVerify.get().getPassword())) {
                ru.setBody(passwordEncoder.matches(user.getPassword(), userToVerify.get().getPassword()));
                ru.setResponse(HttpStatus.OK);
                ru.setMessage("VERIFICATO");
                return ru;
            } else {
                ru.setMessage("PASSWORD ERRATA");
                ru.setResponse(HttpStatus.NOT_FOUND);
                ru.setBody(passwordEncoder.matches(user.getPassword(), userToVerify.get().getPassword()));
                return ru;
            }
        } else {
            ru.setResponse(HttpStatus.NOT_FOUND);
            ru.setMessage("EMAIL NON REGISTRATA");
            return ru;
        }
    }

    public ResponseUser getAnagraficaByEmail(String email) {
        ResponseUser ru = new ResponseUser();
        Optional<User> optionalUser = iUserRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            ru.setBody(
                    UserAnagrafica.builder()
                            .id(optionalUser.get().getId())
                            .email(optionalUser.get().getEmail())
                            .nome(optionalUser.get().getNome())
                            .cognome(optionalUser.get().getCognome())
                            .dataNascita(optionalUser.get().getDataNascita())
                            .citta(optionalUser.get().getCitta())
                            .indirizzo(optionalUser.get().getIndirizzo())
                            .idProdotti(Arrays.stream(optionalUser.get().getIdProdotti().split(",")).collect(Collectors.toList()))
                            .attivo(optionalUser.get().isAttivo())
                            .token(optionalUser.get().getToken())
                            .dataToken(optionalUser.get().getDataToken())
                            .build()
            );
            ru.setMessage("anagrafica trovata");
            ru.setResponse(HttpStatus.OK);

        } else {
            ru.setMessage("anagrafica mancante");
            ru.setResponse(HttpStatus.NOT_FOUND);
        }

        return ru;
    }

    public ResponseUser addItem(String email, int idProdotto) {
        ResponseUser ru = new ResponseUser();
        if (findByEmail(email) != null) {
            User u = findByEmail(email);
            if (u.getIdProdotti().equals("")) {
                u.setIdProdotti(String.valueOf(idProdotto));

            } else {
                u.setIdProdotti(u.getIdProdotti().concat("," + idProdotto));
            }
            iUserRepository.save(u);
            ru.setBody(u);
            return ru;
        }
        return null;
    }


    public ResponseUser addItemsFromString(String email, String idProdotti) {
        ResponseUser ru = new ResponseUser();
        if (findByEmail(email) != null) {
            User u = findByEmail(email);
            if (u.getIdProdotti().equals("")) {
                u.setIdProdotti(idProdotti);

            } else {
                u.setIdProdotti(u.getIdProdotti().concat("," + idProdotti));
            }
            iUserRepository.save(u);
            ru.setBody(findByEmail(email));
            return ru;
        }
        return null;
    }


// Aaassd11

    public void sendEmail(String recipient, String token) {
        ApiClient defaultClient = sendinblue.Configuration.getDefaultApiClient();

        // Configure API key authorization: api-key
        ApiKeyAuth apiKey = (ApiKeyAuth) defaultClient.getAuthentication("api-key");
        apiKey.setApiKey("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");
        // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
        //apiKey.setApiKeyPrefix("Token");


        TransactionalEmailsApi apiInstance = new TransactionalEmailsApi();
        SendSmtpEmail sendSmtpEmail = new SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email
        sendSmtpEmail.setTextContent("clicca qui per validare l'account   " +
                "  <a href='http://localhost:4200/attivato/" + recipient + "/" + token + "'>clicca qui </h> ");
        sendSmtpEmail.setSubject("[Shop Electronics]  Completa la tua iscrizione");

        SendSmtpEmailTo sendSmtpEmailTo = new SendSmtpEmailTo();
        sendSmtpEmailTo.setEmail(recipient);


        sendSmtpEmail.to(Arrays.asList(sendSmtpEmailTo));

        SendSmtpEmailSender sendSmtpEmailSender = new SendSmtpEmailSender();
        sendSmtpEmailSender.setEmail("no-reply@shop-electronics.it");
        sendSmtpEmailSender.setName("Mattia da Shop Electronics");


        sendSmtpEmail.sender(sendSmtpEmailSender);
        try {
            CreateSmtpEmail result = apiInstance.sendTransacEmail(sendSmtpEmail);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling TransactionalEmailsApi#sendTransacEmail");
            e.printStackTrace();
        }
    }
    public void sendEmail(String recipient) {
        ApiClient defaultClient = sendinblue.Configuration.getDefaultApiClient();

        // Configure API key authorization: api-key
        ApiKeyAuth apiKey = (ApiKeyAuth) defaultClient.getAuthentication("api-key");
        apiKey.setApiKey("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");
        // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
        //apiKey.setApiKeyPrefix("Token");


        TransactionalEmailsApi apiInstance = new TransactionalEmailsApi();
        SendSmtpEmail sendSmtpEmail = new SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email
        sendSmtpEmail.setTextContent("clicca qui per reinpostare la password" +
                "  <a href='http://localhost:4200/password-dimenticata/" + recipient +  "'>clicca qui </h> ");
        sendSmtpEmail.setSubject("[Shop Electronics]  Richiesta cambio PASSWORD");

        SendSmtpEmailTo sendSmtpEmailTo = new SendSmtpEmailTo();
        sendSmtpEmailTo.setEmail(recipient);


        sendSmtpEmail.to(Arrays.asList(sendSmtpEmailTo));

        SendSmtpEmailSender sendSmtpEmailSender = new SendSmtpEmailSender();
        sendSmtpEmailSender.setEmail("no-reply@shop-electronics.it");
        sendSmtpEmailSender.setName("Mattia da Shop Electronics");


        sendSmtpEmail.sender(sendSmtpEmailSender);
        try {
            CreateSmtpEmail result = apiInstance.sendTransacEmail(sendSmtpEmail);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling TransactionalEmailsApi#sendTransacEmail");
            e.printStackTrace();
        }
    }


    public ResponseUser attivaAccount( String token, String email) {
        ResponseUser ru = new ResponseUser();
        if (findByEmail(email) != null) {
            User u = findByEmail(email);
            long diff = Duration.between(u.getDataToken(), LocalDateTime.now()).toMinutes();
            if (!u.isAttivo()) {
                if (diff < 2) {
                    if (u.getToken().equals(token)) {
                            u.setAttivo(true);
                            iUserRepository.save(u);
                            ru.setMessage("valido".toUpperCase());
                            ru.setBody(Boolean.TRUE);
                            ru.setResponse(HttpStatus.OK);
                            return ru;
                        } else{
                        ru.setResponse(HttpStatus.BAD_REQUEST);
                        ru.setMessage("token errato".toUpperCase());
                        ru.setBody(Boolean.FALSE);
                        return ru;
                    }
                    } else {
                    ru.setResponse(HttpStatus.REQUEST_TIMEOUT);
                    ru.setMessage("token scaduto".toUpperCase());
                    ru.setBody(Boolean.FALSE);
                    return ru;
                }

            } else {
                ru.setResponse(HttpStatus.CONTINUE);
                ru.setMessage("email gia attiva".toUpperCase());
                ru.setBody(Boolean.FALSE);
                return ru;
            }
        } else{
            ru.setResponse(HttpStatus.NOT_FOUND);
            ru.setMessage("email non trovata".toUpperCase());
            ru.setBody(Boolean.FALSE);
            return ru;

        }


    }


    public synchronized String generateToken() {
        String generatedString = RandomStringUtils.randomAlphanumeric(50);
        return generatedString;
    }

    public ResponseUser aggiornaTokenEDataTokenEdInviaEmail(String email){
        ResponseUser ru = new ResponseUser();
        if(iUserRepository.findByEmail(email).isPresent()){
            User u = iUserRepository.findByEmail(email).get();
            String token = generateToken();
            u.setToken(token);
            u.setDataToken(LocalDateTime.now());
            iUserRepository.save(u);


            sendEmail(email,token);

            ru.setMessage("GENERATO");
            return ru;
        } else {
            ru.setMessage("EMAIL NON TROVATA");
            return ru;
        }
    }

    @Override
    public ResponseUser updatePassword(String email, CambioPassword password){
    ResponseUser ru = new ResponseUser();
            User u = findByEmail(email);
            u.setPassword(passwordEncoder.encode(password.getPassword().get("pwd")));
            iUserRepository.save(u);
            ru.setMessage("password cambiata");
            ru.setBody(u);
            ru.setResponse(HttpStatus.ACCEPTED);
            return ru;

    }

    @Override
    public ResponseUser validaEmail(String email){
        ResponseUser ru = new ResponseUser();
        if(findByEmail(email) != null){
            ru.setMessage("email trovata");
            ru.setBody(findByEmail(email));
            ru.setResponse(HttpStatus.OK);
        }else {
            ru.setMessage("email non trovata");
            ru.setResponse(HttpStatus.NOT_FOUND);
        }
        return ru;
    }

}
