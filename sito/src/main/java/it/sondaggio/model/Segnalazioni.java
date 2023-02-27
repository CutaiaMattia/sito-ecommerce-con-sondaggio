package it.sondaggio.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Profile;

import javax.persistence.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

@Table(catalog = "sondaggio", schema = "")
public class Segnalazioni {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    @Column(name = "id_segnalazione")
    private int  idSegnalazione;


    @ManyToOne
    @JoinColumn(name = "id_domande")
    @JsonManagedReference(value = "id_domande")
    private Domande domande;

    @Column(name = "risposta")
    private String risposta;


}
