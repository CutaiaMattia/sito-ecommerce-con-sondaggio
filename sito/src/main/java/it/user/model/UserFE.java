package it.user.model;


import lombok.Data;

import java.lang.reflect.Array;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Data
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
