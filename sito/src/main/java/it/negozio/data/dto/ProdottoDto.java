package it.negozio.data.dto;


import it.negozio.data.archetypes.IDto;
import it.negozio.data.model.Cat;
import it.negozio.data.model.Immagine;
import it.negozio.data.model.Prodotto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProdottoDto implements IDto {

        private String barcode;
        private String titolo;
        private String descrizione;
        private boolean valido;
        private double prezzo;
        private Cat categoria;



        @Override
        public Prodotto toModel() {
            return Prodotto.builder()
                    .barcode(barcode)
                    .titolo(titolo)
                    .descrizione(descrizione)
                    .valido(valido)
                    .prezzo(prezzo)
                    .categoria(categoria)
                    .build();
        }
    }


