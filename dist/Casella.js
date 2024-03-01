"use strict";
// a. Classe Casella
// Aquesta classe representarà cada una de les caselles individuals del tauler de buscamines. Cada Casella ha de tenir els següents atributs i mètodes:
// Atributs:
// esMina: Un booleà que indica si la casella conté una mina.
// revelada: Un booleà que indica si la casella ha estat revelada per l'usuari.
// marcada: Un booleà que indica si la casella ha estat marcada com a sospitosa de contenir una mina per l'usuari.
// Mètodes:
// Constructor: Ha de rebre com a paràmetre si la celda és una mina (esMina) i inicialitzar els altres atributs adequadament.
class Casella {
    constructor() {
        this.esMina = false;
        this.revelada = false;
        this.marcada = false;
    }
    setEsMina(esMina) {
        this.esMina = esMina;
    }
    setRevelada(revelada) {
        this.revelada = revelada;
    }
    setMarcada(marcada) {
        this.marcada = marcada;
    }
    getRevelada() {
        return this.revelada;
    }
    getMarcada() {
        return this.marcada;
    }
    getEsMina() {
        return this.esMina;
    }
}
