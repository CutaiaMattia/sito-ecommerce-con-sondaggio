package it.sondaggio.service;
import it.sondaggio.repository.IPercorsiRepo;
import it.sondaggio.model.Percorsi;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PercorsiService implements IPercorsiService {

    private IPercorsiRepo iPercorsiRepo;

    public PercorsiService(IPercorsiRepo iPercorsiRepo) {
        this.iPercorsiRepo = iPercorsiRepo;
    }




    @Override
    public List<Percorsi> getAll(){
        return iPercorsiRepo.findAll();
    }

    @Override
    public Percorsi getById(int id) {
        Optional<Percorsi> percorsiOptional = iPercorsiRepo.findById(id);
        if(percorsiOptional.isPresent()){
            return percorsiOptional.get();
        }
        return null;
    }

}
