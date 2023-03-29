package it.user.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserFE {

    int id;
    String nome;
    String cognome;
    Map<String,String> email = new HashMap<>();
    Map<String,String> password = new HashMap<>();
    String citta;
    String indirizzo;
    LocalDate dataNascita;
    Boolean terms;


}
