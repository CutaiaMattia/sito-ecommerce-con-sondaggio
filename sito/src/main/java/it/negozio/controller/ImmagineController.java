package it.negozio.controller;


import it.negozio.model.Immagine;
import it.negozio.service.IImmagineService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/immagine")
public class ImmagineController {

    private IImmagineService iImmagineService;

    public ImmagineController(IImmagineService iImmagineService){
        this.iImmagineService = iImmagineService;
    }


    @GetMapping("/all")
    public List<Immagine> getAll(){
        List<Immagine> immagineList = iImmagineService.getAll();
        return immagineList;
    }



     @GetMapping("/{id}")
     public Immagine getById(@PathVariable int id){
     return iImmagineService.getById(id).get();
      }


      @GetMapping("/prodotto/{idProdotto}")
    public List<Immagine> getAllByIdProdotto(@PathVariable int idProdotto){
        return iImmagineService.getUrlByIdProdotto(idProdotto);
      }
}
