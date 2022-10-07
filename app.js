new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [7, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.hayUnaPartidaEnJuego=true;
            this.saludJugador=100;
            this.saludMonstruo=100;
        },
        atacar: function () {
            let danio=this.calcularHeridas(this.rangoAtaque);
            this.saludMonstruo-=danio;
            this.turnos.unshift({
                esJugador:true,
                text:"el jugador golpeo al monstruo por "+danio
            })
            if(this.verificarGanador()){
            }
            this.ataqueDelMonstruo();
        },

        ataqueEspecial: function () {
            let danio=this.calcularHeridas(this.rangoAtaqueEspecial);
            this.saludMonstruo-=danio;
            this.registrarEvento({estado:true,text:"el jugador golpeo al monstruo por "+danio});
            if(this.verificarGanador()){
            }
            this.ataqueDelMonstruo();
        },

        curar: function () {
            if(this.saludJugador<=90){
                this.saludJugador+=10;
            }else{
                this.saludJugador=100;
            }
            if(this.verificarGanador()){
            }
            this.registrarEvento({estado:true,text:"el jugador se curo 10 de daño"});
            this.ataqueDelMonstruo();
        },

        registrarEvento(evento) {
            this.turnos.unshift({
                esJugador:evento.estado,
                text:evento.text
            })
        },
        terminarPartida: function () {
            this.hayUnaPartidaEnJuego=false;
            
        },

        ataqueDelMonstruo: function () {
            let danio=this.calcularHeridas(this.rangoAtaqueDelMonstruo);
            this.saludJugador-=danio;
            this.registrarEvento({estado:false,text:"el Monstruo golpeo al monstruo por "+danio});
            if(this.verificarGanador()){
            }
        },

        calcularHeridas: function (rango) {
            let danio= Math.max(Math.floor(Math.random()*Number(rango[1]))+1,Number(rango[0]))    
            return danio

        },
        verificarGanador: function () {
            if(this.saludMonstruo<=0){
                this.registrarEvento({text:"Ganaste!!, jugamos otra partida?"})
                this.terminarPartida();
            }else if(this.saludJugador<=0){
                this.registrarEvento({text:"Perdiste, jugamos otra partida?"})
                this.terminarPartida();
            }else{
                
            }

            return false;
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});