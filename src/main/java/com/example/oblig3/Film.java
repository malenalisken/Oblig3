package com.example.oblig3;

public class Film {
    private String navn;
    public Film(String navn){
        this.navn = navn ;
    }
    public Film(){}

    public void setNavn(String navn) {
        this.navn = navn;
    }

    public String getNavn() {
        return navn;
    }
}