package it.negozio.controller;

import it.negozio.model.Prodotto;
import it.negozio.service.IProdottoService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/prodotto")
public class ProdottoController {


    private IProdottoService iProdottoService;

    public ProdottoController(IProdottoService iProdottoService) {
        this.iProdottoService = iProdottoService;
    }


    @GetMapping
    public List<Prodotto> getAll() {
        List<Prodotto> prodottoList = iProdottoService.getAll();
        return prodottoList;
    }

    @GetMapping("/prodotto/{categoria}")
    public List<Prodotto> getProdottiByCategoria(@PathVariable String categoria){
        return iProdottoService.getProdottiByCategoria(categoria);
    }


    @GetMapping("/{id}")
    public Prodotto getById(@PathVariable int id) {
        return iProdottoService.getById(id).get();
    }


    @GetMapping("/parz/{nomeParziale}")
    public List<Prodotto> getSearch( @PathVariable String nomeParziale){
        return iProdottoService.getSearch(nomeParziale);
    }

}
