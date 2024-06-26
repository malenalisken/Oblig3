$(function() { //ready funksjon, starter når siden er lastet
    hentAlleFilmer();
    hentAlle();
});


function hentAlleFilmer(){ //henter filmer fra database gjennom controller
    $.get("/hentFilmer",function (filmer){
        formaterFilmer(filmer);
        console.log(filmer);
    });
}
function formaterFilmer(filmer){
    let ut = "<select id='valgtFilm' class='dropdown' >"
    ut+="<option disabled selected>Velg Film</option>";
    console.log(filmer);
    for (const f of filmer){
        ut+= "<option>" + f.navn + "</option>";
    }
    ut+="</select>";
    $("#velgFilm").html(ut);
}

function lagreBillett(){
    const billett = {
        film : $("#valgtFilm").val(),
        antall : $("#antall").val(),
        fornavn : $("#fornavn").val(),
        etternavn : $("#etternavn").val(),
        telefonnr : $("#telefonnr").val(),
        epost : $("#epost").val(),
    }
    $.post("/lagre",billett,function(){
        hentAlle();
    });
    $("#valgtFilm").val("");
    $("#antall").val("");
    $("#fornavn").val("");
    $("#etternavn").val("");
    $("#telefonnr").val("");
    $("#epost").val("");
}
function hentAlle(){
    $.get("/hentAlle", function(billetter){
        formaterData(billetter);
    });
}
function formaterData(billetter){
    let ut = "<table class='table table-striped'><tr>" +
        "<th>Film</th><th>Antall</th><th>Fornavn</th>" +
        "<th>Etternavn</th><th>Telefonnr</th><th>Epost</th><th></th><th></th>" +
        "</tr>";
    for (const b of billetter){
        ut+= "<tr><td>" + b.film + "</td><td>" + b.antall + "</td>" +
            "<td>" + b.fornavn + "</td><td>" + b.etternavn + "</td>" +
            "<td>" + b.telefonnr + "</td><td>" + b.epost + "</td>" +
            "<td><button class='btn btn-primary' onclick='idEndring("+b.id+")'>Endre</button>" +
            "<td><button class='btn btn-danger' onclick='slettEnBillett("+b.id+")'>Slett</button>" +
            "</tr>";

    }
    ut+= "</table>";
    $("#utskrift").html(ut);
}
function idEndring(id){
    window.location.href = "/endring.html?"+id; //sender til endring.html
}
function slettEnBillett(id) { //sletter kunn billett med samme id som ønsket billett
    const url = "/slettEnBillett?id="+id;
    $.get( url, function() {
        window.location.href = "/";
    });
}
function slettAlle(){ //sletter alle billetter og laster inn tabellen på nytt(tomt)
    $.get("/slettAlle",function (){
        hentAlle();
    })
}
function sjekkValgtFilm(){
    let film = $("#valgtFilm").val();
    if (film === "" || film === null){
        return false
    }else{
        return true
    }
} //valideringer
function sjekkAntall(){
    let input=Number($("#antall").val());
    if (isNaN(input) || input <= 0){
        $("#feilAntall").text("Må være et tall over 0");
        return false;
    } else {
        $("#feilAntall").text("");
        return true;
    }
}
function sjekkFornavn(){
    let input = $("#fornavn").val();
    const pattern = /^[a-zA-Z]{1,}$/;
    let validFornavn = pattern.test(input);
    if (validFornavn){
        $("#feilFornavn").text("");
        return true;
    } else {
        $("#feilFornavn").text("Kun bostaver, ingen andre tegn");
        return false;
    }
}
function sjekkEtternavn(){
    let input = $("#etternavn").val();
    const pattern = /^[a-zA-Z]{1,}$/;
    let validFornavn = pattern.test(input);
    if (validFornavn){
        $("#feilEtternavn").text("");
        return true;
    } else {
        $("#feilEtternavn").text("Kun bostaver, ingen andre tegn");
        return false;
    }
}
function sjekkTelefonnr() {
    let input = $("#telefonnr").val();
    const pattern = /^[0-9]{8}$/;
    let validTelefonnr = pattern.test(input);
    if (validTelefonnr) {
        $("#feilTelefonnr").text("");
        return true;
    } else {
        $("#feilTelefonnr").text("Må være 8 tall");
        return false;
    }
}
function sjekkEpost() {
    let input = $("#epost").val();
    const pattern = /^[\w]+@[\w]+\.[a-zA-Z0-9]{2,}$/;
    let validEpost = pattern.test(input);
    if (validEpost) {
        $("#feilEpost").text("");
        return true;
    } else {
        $("#feilEpost").text("Må inneholde @ og .")
        return false;
    }
}
function validateForm(){
    let validFilm = sjekkValgtFilm();
    let validAntall = sjekkAntall();
    let validFornavn = sjekkFornavn();
    let validEtternavn = sjekkEtternavn();
    let validTelefonnr = sjekkTelefonnr();
    let validEpost = sjekkEpost();
    if(validFilm & validAntall & validFornavn & validEtternavn & validTelefonnr & validEpost){
        if(!validFilm){
            $("#ingenFilm").text("Vennligst velg en film")
        }else{
            $("#ingenFilm").text("")
        }
        lagreBillett();
    }
}//registrerer billetten om alle valideringer er godkjente