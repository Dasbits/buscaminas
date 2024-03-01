// Classe Joc

// Finalment, la tercera part de la pràctica consisteix en desenvolupar la classe Joc, que serà l'encarregada de gestionar la lògica del joc, incloent la interacció de l'usuari i el seguiment de l'estat del joc. La classe Joc ha de tenir els següents atributs i mètodes:

// Atributs:
// tauler : Una instància de la classe Tauler que representa el tauler de joc.
// Mètodes:
// Constructor: Ha de crear el tablero i preparar tot el necessari per començar a jugar.
// dibuixarTauler(): Un mètode per dibuixar o actualitzar la representació visual del tauler en l'interfície d'usuari. Això voldrà dir, que hem de crear una representació en HTML que sigui coherent amb la representació del tauler.
// revelarCasella(fila, columna): Un mètode per gestionar l'acció de l'usuari de revelar una celda, incloent la comprovació de mines i l'actualització de l'estat del joc.
// marcarCasella(fila, columna): Un mètode per permetre a l'usuari marcar o desmarcar una celda com a sospitosa de contenir una mina.
// reset(): Un mètode per reiniciar el joc, creant un nou tauler i actualitzant la interfície gràfica.

// comanda per compilar en temps real: npx tsc --watch

class Joc {
    private tauler: Tauler;
    private numMines: number;

    constructor(dificultat: string) {
        
        this.crearTauler(dificultat);
        this.colocaMines(dificultat);
        this.dibuixarTauler();
    }
    private crearTauler(dificultat: string) {
        switch (dificultat) {
            case "facil":
                this.tauler = new Tauler(8, 8);
                break;
            case "mitja":
                this.tauler = new Tauler(14, 14);
                break;
            case "dificil":
                this.tauler = new Tauler(20, 20);
                break;
        }
    }
    private colocaMines(dificultat: string) {
        switch (dificultat) {
            case "facil":
                this.numMines = 10;
                break;
            case "mitja":
                this.numMines = 15;
                break;
            case "dificil":
                this.numMines = 20;
                break;
        }
        this.colocaMinesAleatories(this.numMines);
        document.getElementById("flags").innerHTML = this.numMines.toString();
    }
    private colocaMinesAleatories(mines: number) {
        let minesColocades = 0;
        while (minesColocades < mines) {
            let fila = Math.floor(Math.random() * this.tauler.getFilas());
            let columna = Math.floor(Math.random() * this.tauler.getColumnes());
            if (!this.tauler.getCaselles()[fila][columna].getEsMina()) {
                this.tauler.getCaselles()[fila][columna].setEsMina(true);
                minesColocades++;
            }
        }
    }

    public dibuixarTauler() {
        let tauler = document.getElementById("juego");
        tauler.innerHTML = "";
        for (let i = 0; i < this.tauler.getFilas(); i++) {
            let fila = document.createElement("div");
            fila.className = "fila";
            for (let j = 0; j < this.tauler.getColumnes(); j++) {
                let casella = document.createElement("img");
                casella.src = "img/square.gif";
                casella.className = "casella";
                casella.dataset.fila = i.toString();
                casella.dataset.columna = j.toString();
                casella.addEventListener("click", () => this.revelarCasella(i, j));
                casella.addEventListener("contextmenu", (e) => {
                    e.preventDefault();
                    this.marcarCasella(i, j);
                });
                fila.appendChild(casella);
            }
            tauler.appendChild(fila);
        }
    }

    public revelarCasella(fila: number, columna: number) {
        let casella = this.tauler.getCaselles()[fila][columna];
        if (!casella.getRevelada() && !casella.getMarcada()) {
            casella.setRevelada(true);
            var element = document.querySelector(`.casella[data-fila="${fila}"][data-columna="${columna}"]`) as HTMLImageElement;
            element.classList.add(casella.getEsMina() ? "mina" : "buida");
            
            if (casella.getEsMina()) {
                element.src = "img/mina.png";
                // revelar totes les mines
                for (let i = 0; i < this.tauler.getFilas(); i++) {
                    for (let j = 0; j < this.tauler.getColumnes(); j++) {
                        if (this.tauler.getCaselles()[i][j].getEsMina()) {
                            let casellaMina = document.querySelector(`.casella[data-fila="${i}"][data-columna="${j}"]`) as HTMLImageElement;
                            casellaMina.src = "img/mina.png";
                        }
                    }
                }
                setTimeout(() => {
                    alert("Has perdut!");
                    this.reset();
                }, 250);
            } else {
                this.tauler.setCasellesRevelades(this.tauler.getCasellesRevelades() + 1);
                element.src = "img/Minesweeper_"+this.minesAlVoltant(fila, columna).toString()+".gif";
                element.classList.add("revelada");
                // si no hi ha mines al voltant, revelar les caselles adjacents
                if (this.minesAlVoltant(fila, columna) === 0) {
                    for (let i = Math.max(0, fila - 1); i <= Math.min(this.tauler.getFilas() - 1, fila + 1); i++) {
                        for (let j = Math.max(0, columna - 1); j <= Math.min(this.tauler.getColumnes() - 1, columna + 1); j++) {
                            this.revelarCasella(i, j);
                        }
                    }
                }
                
                if(this.tauler.getCasellesRevelades() === this.tauler.getFilas() * this.tauler.getColumnes() - this.numMines) {
                    setTimeout(() => {
                        alert("Has guanyat!");
                        this.reset();
                    }, 250);
                }
            }
        }
    }
    //contar mines al voltant
    public minesAlVoltant(fila: number, columna: number) {
        let mines = 0;
        for (let i = Math.max(0, fila - 1); i <= Math.min(this.tauler.getFilas() - 1, fila + 1); i++) {
            for (let j = Math.max(0, columna - 1); j <= Math.min(this.tauler.getColumnes() - 1, columna + 1); j++) {
                if (this.tauler.getCaselles()[i][j].getEsMina()) {
                    mines++;
                }
            }
        }
        return mines;
    }

    public marcarCasella(fila: number, columna: number) {
        let casella = this.tauler.getCaselles()[fila][columna];
        if (!casella.getRevelada()) {
            casella.setMarcada(!casella.getMarcada());
            let element = document.querySelector(`.casella[data-fila="${fila}"][data-columna="${columna}"]`) as HTMLImageElement;
            element.classList.toggle("marcada");
            element.src = casella.getMarcada()?"img/flag.png":"img/square.gif";

            let flags = Number(document.getElementById("flags").innerHTML);
            flags += casella.getMarcada() ? -1 : 1;
            document.getElementById("flags").innerHTML = flags.toString();
        }
    }

    public reset() {
        let dificultat = document.getElementById("dificultat") as HTMLSelectElement;
        this.crearTauler(dificultat.value);
        this.colocaMines(dificultat.value);
        this.dibuixarTauler();
        document.getElementById("temps").textContent = "0";
    }
    
}