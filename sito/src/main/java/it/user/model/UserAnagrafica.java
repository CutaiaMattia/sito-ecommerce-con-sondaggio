package it.user.model;


import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;


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
}
