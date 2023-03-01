package it.negozio.service;

import it.negozio.model.Prodotto;
import it.negozio.repository.IProdottoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
    public Boolean update(Prodotto prodotto) {
        Optional<Prodotto> prodottoOptional = iProdottoRepository.findById(prodotto.getId());
        if (prodottoOptional.isEmpty()) {
            return false;
        } else {
            Prodotto prodottoToSave = prodottoOptional.get();
            prodottoToSave.setBarcode(prodotto.getBarcode());
            prodottoToSave.setTitolo(prodotto.getTitolo());
            prodottoToSave.setDescrizione(prodotto.getDescrizione());
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
