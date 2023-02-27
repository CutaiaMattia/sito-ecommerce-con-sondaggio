package it.negozio.data.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import it.negozio.data.archetypes.IModel;
import it.negozio.data.dto.ImmagineDto;
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
@Table(catalog = "negozio",schema = "")
public class Immagine implements IModel {

    public static final String FK_PRODOTTO_IMMAGINE = "prodotto";


    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JsonBackReference(value = "id_Prodotto")
    @JoinColumn(name = "id_Prodotto")
    private Prodotto prodotto;

    @Column(name = "url")
    private String url ="";


    @Override
    public ImmagineDto toDto() {
        return ImmagineDto.builder()
                .id_Prodotto(prodotto.getId())
                .url(url)
                .build();
    }
}
