package it.sondaggio.controller;

import it.sondaggio.service.IDomandeService;
import it.sondaggio.model.Domande;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/domande")
@CrossOrigin(allowedHeaders = {"*"})
public class DomandeController {


    private IDomandeService iDomandeService;

    public DomandeController(IDomandeService iDomandeService) {
        this.iDomandeService = iDomandeService;
    }




    @GetMapping("/pagina/{percorso}/{page}")
    public List<Domande> getPegineJPA(@PathVariable int page, @PathVariable int percorso){
        return iDomandeService.getAll(page,percorso);
    }


    @GetMapping("/maxPagineForPercorso/{percorso}")
    public float getMaxPage(@PathVariable int percorso){
        return iDomandeService.getMaxPageForPercorso(percorso);
    }
    
}
