package it.negozio.service;

import it.negozio.model.Prodotto;
import it.negozio.repository.IProdottoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProdottoService implements IProdottoService {
    private IProdottoRepository iProdottoRepository;

    public ProdottoService(IProdottoRepository iProdottoRepository){
        this.iProdottoRepository = iProdottoRepository;
    }

    @Override
    public List<Prodotto> getAll() {
        return iProdottoRepository.findAll();
    }

    @Override
    public Optional<Prodotto> getById(int id) {
        Optional<Prodotto> prodottoOptional = iProdottoRepository.findById(id);
        if (prodottoOptional.isPresent()) {
            return prodottoOptional;
        } else {
            return Optional.empty();
        }
    }



    @Override
    public List<Prodotto> getProdottiByCategoria(String categoria) {
        List<Prodotto> prodottoPhone = new ArrayList<>();
        for(Prodotto prodotto : iProdottoRepository.findAll()) {
            if (prodotto.getCategoria().name().equalsIgnoreCase(categoria)) {
                prodottoPhone.add(prodotto);
            }
        }

            return prodottoPhone;

    }



    public List<Prodotto> getSearch(String nomeProdotto){
        List<Prodotto> prodottiFind = new ArrayList<>();
        for(Prodotto prodotto : iProdottoRepository.findAll()) {
            if(((prodotto.getTitolo().toLowerCase().trim()).contains(nomeProdotto.toLowerCase().trim()))
            ){
                prodottiFind.add(prodotto);
            }
        }
        return prodottiFind;
    }














    @Override
    public Boolean update(Prodotto prodotto) {
        Optional<Prodotto> prodottoOptional = iProdottoRepository.findById(prodotto.getId());
        if (prodottoOptional.isEmpty()) {
            return false;
        } else {
            Prodotto prodottoToSave = prodottoOptional.get();
            prodottoToSave.setBarcode(prodotto.getBarcode());
            prodottoToSave.setTitolo(prodotto.getTitolo());
            prodottoToSave.setDescrizioneB(prodotto.getDescrizioneB());
            prodottoToSave.setDescrizioneL(prodotto.getDescrizioneL());
            prodottoToSave.setDataModifica(LocalDate.now());
            prodottoToSave.setPrezzo(prodotto.getPrezzo());
            prodottoToSave.setValido(prodotto.getValido());
            iProdottoRepository.save(prodotto);
            return true;
        }
    }

    @Override
    public Boolean delete(int id) {
        Optional<Prodotto> prodottoOptional = iProdottoRepository.findById(id);
        if (prodottoOptional.isPresent()) {
            iProdottoRepository.delete(prodottoOptional.get());
            return true;
        } else {
            return false;
        }
    }
}
