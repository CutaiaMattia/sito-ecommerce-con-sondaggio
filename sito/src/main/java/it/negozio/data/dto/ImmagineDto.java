package it.negozio.data.dto;

import it.negozio.data.archetypes.IDto;
import it.negozio.data.model.Immagine;
import it.negozio.data.model.Prodotto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ImmagineDto implements IDto {


    private int id_Prodotto;

    private String url;


    @Override
    public Immagine toModel() {
        Prodotto p = new Prodotto();
        p.setId(getId_Prodotto());

        return Immagine.builder()
                .prodotto(p)
                .url(url)
                .build();
    }
}
