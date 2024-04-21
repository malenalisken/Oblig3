package com.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class BillettController {
    @Autowired
    private BillettRepository rep;

    @Autowired
    private FilmRepository frep;

    @GetMapping("/hentFilmer")
    public List<Film> hentAlleFilmer(){

        return frep.hentAlleFilmer();
    }

    @PostMapping("/lagre")
    public void lagre(Billett billett){
        rep.lagreBillett(billett);
    }

    @GetMapping("/hentAlle")
    public List<Billett> hentAlle(){

        return rep.hentAlleBilletter();
    }

    @GetMapping("/slettAlle")
    public void slettAlle(){

        rep.slettAlleBilleter();
    }
}
