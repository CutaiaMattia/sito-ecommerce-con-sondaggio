package it.user.model;


import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Builder
@Data
public class UserAnagrafica {

    int id;
    String nome;
    String cognome;
    String email;
    String citta;
    String indirizzo;
    LocalDate dataNascita;
    List<String> idProdotti = new ArrayList<>();
    boolean attivo;

    String token;
    LocalDateTime dataToken;
}
