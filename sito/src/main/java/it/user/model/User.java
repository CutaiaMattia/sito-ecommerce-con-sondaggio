package it.user.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(catalog = "anagrafica", schema = "")
public class User {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    @Column(name = "nome")
    private String nome;

    @Column(name = "cognome")
    private String cognome;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "citta")
    private String citta;

    @Column(name = "indirizzo")
    private String indirizzo;

    @Column(name = "data_nascita")
    private LocalDate dataNascita;

    @Column(name = "data_creazione")
    private LocalDate dataCreazione;
    @Column(name = "data_modifica")
    private LocalDate dataModifica;



}
