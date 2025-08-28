class Usuario {
    notificacionesRecibidas = [];

    constructor({nombre, email, tipo}) {
        this.nombre = nombre;
        this.email = email;
        this.tipo = tipo;
    }

    // get nombreUsuario() {
    //     return this.nombreUsuario;
    // }

    // get email() {
    //     return this.email;
    // }

    // get tipo() {
    //     return this.tipo;
    // }


    recibirNotificacion(notificacion){
        //console.log("Estoye en usuario");
        try {
            //console.log("notificacionesRecibidas:", this.notificacionesRecibidas);
            this.notificacionesRecibidas.push(notificacion);
            //console.log("termine");
        } catch (error) {
            console.error("Error en recibirNotificacion:", error);
        }
    }
    
}

module.exports = { Usuario }
