package it.sondaggio.model.requestModel;

import it.sondaggio.model.Domande;
import it.sondaggio.model.Segnalazioni;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SegnalazioneInsertRequest {

    private int idSegnalazione;
    private int idDomande;
    private String risposta;







        public Segnalazioni toSegnalazione() {

            Domande domande = new Domande();
            domande.setId(idDomande);



            return Segnalazioni.builder()
                    .idSegnalazione(getIdSegnalazione())
                    .domande(domande)
                    .risposta(getRisposta())
                    .build();
        }

    }

