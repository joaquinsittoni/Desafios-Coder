class Evento {
    static contadorEventos = 0;
    static precioBaseDeGanancia = 0.15;

    constructor({ nombre, localidad, precio = 50, capacidad = 50, fecha = Date.now, participantes = [] }) {
        this.nombre = nombre;
        this.localidad = localidad;
        this.precio = precio * (1 + Evento.precioBaseDeGanancia); 
        this.capacidad = capacidad;
        this.fecha = fecha;
        this.participantes = participantes;
        this.id = ++Evento.contadorEventos;
    }
}

class TicketManager {
    constructor() {
        this.eventos = [];
    }

    getEventos = () => {
        return this.eventos;
    };

    addEvento = (nombre, localidad, precio = 50, capacidad = 50, fecha = Date.now) => {
        const evento = new Evento({ nombre, localidad, precio, capacidad, fecha }); 

        this.eventos.push(evento);
        return evento.id; 
    };

    addUsuario = (idEvento, idUsuario) => {
        // Verifica la existencia del evento
        const evento = this.eventos.find((evento) => evento.id === idEvento);
        if (!evento) {
            console.log("El evento no existe!");
            return;
        }

        // Verifica que el usuario no esté registrado en el evento en cuestión
        const usuarioYaEstaEnEvento = evento.participantes.includes(idUsuario);
        if (usuarioYaEstaEnEvento) {
            console.log("El usuario ya se encuentra en ese evento!");
            return;
        }

        evento.participantes.push(idUsuario);
    };

    setEventoEnGira = (idEvento, localidad, fecha = Date.now) => {
        // Verifica la existencia del evento
        const evento = this.eventos.find((evento) => evento.id === idEvento);
        if (!evento) {
            console.log("El evento no existe!");
            return;
        }
        const newEventoEnGira = new Evento({ ...evento, localidad, fecha });
        this.eventos.push(newEventoEnGira);

        return evento.id; 
    };
}

// Instancio el TicketManager
const ticketManager = new TicketManager();

const evento1 = ticketManager.addEvento("Concierto de rock", "Londres", 50, 105, "2023-12-10");
const evento2 = ticketManager.addEvento("Concierto de pop", "Brooklyn", 49, 101, "2023-11-19");
const evento3 = ticketManager.addEvento("Concierto de reggaeton", "California", 42, 103, "2023-12-22");


ticketManager.addUsuario(evento1, "Joaquin");
ticketManager.addUsuario(evento1, "Agustina");
ticketManager.addUsuario(evento2, "francisco");
ticketManager.addUsuario(evento2, "rafael");
ticketManager.addUsuario(evento3, "Juan");

// Creo un nuevo evento como copia o versión modificada de un existente
const evento4 = ticketManager.setEventoEnGira(evento1, "Argentina", "2023-15-12");
// Agrego usuario al nuevo evento en gira
ticketManager.addUsuario(evento4, "Lionel");

console.log(ticketManager.getEventos());