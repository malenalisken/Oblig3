$(function() {
    hentAlleFilmer();
    hentEnBillett();
});
function hentAlleFilmer(){
    $.get("/hentFilmer",function (filmer){
        formaterFilmer(filmer);
        console.log(filmer);
    });
}
function formaterFilmer(filmer){
    let ut = "<select id='valgtFilm' class='dropdown' >"
    console.log(filmer);
    for (const f of filmer){
        ut+= "<option>" + f.navn + "</option>";
    }
    ut+="</select>";
    $("#velgFilm").html(ut);
}
function hentEnBillett(){
    const id= window.location.search.substring(1);
    const url = "/hentEnBillett?id=" + id;
    $.get(url,function (enBillett){
        $("#id").val(enBillett.id);
        $("#valgtFilm").val(enBillett.film);
        $("#antall").val(enBillett.antall);
        $("#fornavn").val(enBillett.fornavn);
        $("#etternavn").val(enBillett.etternavn);
        $("#telefonnr").val(enBillett.telefonnr);
        $("#epost").val(enBillett.epost);

    });
}
function endreBillett(){
    const billett = {
        id: $("#id").val(),
        film : $("#valgtFilm").val(),
        antall : $("#antall").val(),
        fornavn : $("#fornavn").val(),
        etternavn : $("#etternavn").val(),
        telefonnr : $("#telefonnr").val(),
        epost : $("#epost").val(),
    };
    $.post("/endre", billett, function (){
    });

    window.location.href="/";
}

function sjekkValgtFilm(){
    let film = $("#valgtFilm").val();
    if (film === "" || film === null){
        return false
    }else{
        return true
    }
}
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
        endreBillett();
    }
}