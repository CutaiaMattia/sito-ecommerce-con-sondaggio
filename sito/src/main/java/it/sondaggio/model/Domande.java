package it.sondaggio.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(catalog = "sondaggio", schema = "")
public class Domande {


    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "percorso")
    private int percorso;

    @Column(name = "step")
    private int step;

    @Column(name = "tipo_domanda")
    private String tipoDomanda;

    @Column(name = "desc_domanda")
    private String domanda;

    @Column(name = "risposte_possibili")
    private String rispostePossibili;
}
