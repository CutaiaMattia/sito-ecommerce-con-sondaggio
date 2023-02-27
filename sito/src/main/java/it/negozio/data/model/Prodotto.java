package it.negozio.data.model;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import it.negozio.data.archetypes.IModel;
import it.negozio.data.dto.ProdottoDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(catalog = "negozio",schema = "")
public class Prodotto implements IModel {


    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "barcode")
    private String barcode;
    @Column(name = "titolo")
    private String titolo;
    @Column(name = "descrizione")
    private String descrizione;
    @Column(name = "valido")
    private Boolean valido;
    @Column(name = "data_creazione")
    private LocalDate dataCreazione;
    @Column(name = "data_modifica")
    private LocalDate dataModifica;
    @Column(name = "prezzo")
    private double prezzo;

    @Enumerated(EnumType.STRING)
    @Column(name = "categoria")
    private Cat categoria;

    @OneToMany
    @JsonManagedReference(value = "id_Prodotto")
    @JoinColumn(name = "id_Prodotto")
    private List<Immagine> immagini;

    @Override
    public ProdottoDto toDto() {
        return ProdottoDto.builder()
                .barcode(barcode)
                .titolo(titolo)
                .descrizione(descrizione)
                .valido(valido)
                .prezzo(prezzo)
                .categoria(categoria)
                .build();
    }
}
