// Deberiamos exportar alojamientos reales sacados de nuestra base de datos o backend.
// Por el momento vamos a usar datos mockeados para simular la funcionalidad de la aplicación

export const alojamientos = [
    {
        id: 1,
        nombre: "Hotel 1",
        descripcion: "Encuentra tu lugar ideal para hospedarte",
        imagenes : ["/Images/1.jpg",
        "/Images/1.jpg",
        "/Images/1.jpg",
        "/Images/1.jpg",
        "/Images/1.jpg"],
        precio: 100,
        direccion: "Buenos Aires, Argentina",
        calificacion: 4.5,
        caracteristicas: ["WIFI", "ESTACIONAMIENTO"],
        cantHuespedesMaximo: 2
    },
    {
        id: 2,
        nombre: "Hotel 2",
        descripcion: "Disfruta de una estancia cómoda y relajante",
        imagen: "/Images/1.jpg",
        precio: 150,
        direccion: "Córdoba, Argentina",
        calificacion: 4.0,
        caracteristicas: ["PISCINA", "ESTACIONAMIENTO"],
        cantHuespedesMaximo: 2
    },
    {
        id: 3,
        nombre: "Hotel 3",
        descripcion: "Un lugar perfecto para tus vacaciones",
        imagen: "/Images/1.jpg",
        precio: 200,
        direccion: "Mendoza, Argentina",
        calificacion: 4.8,
        caracteristicas: ["WIFI", "MASCOTAS_PERMITIDAS"],
        cantHuespedesMaximo: 2
    },
    {
        id: 4,
        nombre: "Hotel 4",
        descripcion: "Encuentra tu lugar ideal para hospedarte",
        imagen: "/Images/1.jpg", // image: process.env.PUBLIC_URL + "/Images/1.jpg"
        precio: 100,
        direccion: "Buenos Aires, Argentina",
        calificacion: 4.5,
        caracteristicas: ["WIFI", "ESTACIONAMIENTO"],
        cantHuespedesMaximo: 2
    },
    {
        id: 5,
        nombre: "Hotel 5",
        descripcion: "Disfruta de una estancia cómoda y relajante",
        imagen: "/Images/1.jpg",
        precio: 150,
        direccion: "Córdoba, Argentina",
        calificacion: 4.0,
        caracteristicas: ["PISCINA", "ESTACIONAMIENTO"],
        cantHuespedesMaximo: 2
    },
    {
        id: 6,
        nombre: "Hotel 6",
        descripcion: "Un lugar perfecto para tus vacaciones",
        imagen: "/Images/1.jpg",
        precio: 200,
        direccion: "Mendoza, Argentina",
        calificacion: 4.8,
        caracteristicas: ["WIFI", "MASCOTAS_PERMITIDAS"]
    },
    {
        id: 7,
        nombre: "Hotel 7",
        descripcion: "Encuentra tu lugar ideal para hospedarte",
        imagen: "/Images/1.jpg", // image: process.env.PUBLIC_URL + "/Images/1.jpg"
        precio: 100,
        direccion: "Buenos Aires, Argentina",
        calificacion: 4.5,
        caracteristicas: ["WIFI", "ESTACIONAMIENTO"]
    },
    {
        id: 8,
        nombre: "Hotel 8",
        descripcion: "Disfruta de una estancia cómoda y relajante",
        imagen: "/Images/1.jpg",
        precio: 150,
        direccion: "Córdoba, Argentina",
        calificacion: 4.0,
        caracteristicas: ["PISCINA", "ESTACIONAMIENTO"]
    },
    {
        id: 9,
        nombre: "Hotel 9",
        descripcion: "Un lugar perfecto para tus vacaciones",
        imagen: "/Images/1.jpg",
        precio: 200,
        direccion: "Mendoza, Argentina",
        calificacion: 4.8,
        caracteristicas: ["WIFI", "MASCOTAS_PERMITIDAS"]
    },
    {
        id: 10,
        nombre: "Hotel 10",
        descripcion: "Encuentra tu lugar ideal para hospedarte",
        imagen: "/Images/1.jpg", // image: process.env.PUBLIC_URL + "/Images/1.jpg"
        precio: 100,
        direccion: "Buenos Aires, Argentina",
        calificacion: 4.5,
        caracteristicas: ["WIFI", "ESTACIONAMIENTO"]
    },
    {
        id: 11,
        nombre: "Hotel 11",
        descripcion: "Disfruta de una estancia cómoda y relajante",
        imagen: "/Images/1.jpg",
        precio: 150,
        direccion: "Córdoba, Argentina",
        calificacion: 4.0,
        caracteristicas: ["PISCINA", "ESTACIONAMIENTO"]
    },
    {
        id: 12,
        nombre: "Hotel 12",
        descripcion: "Un lugar perfecto para tus vacaciones",
        imagen: "/Images/1.jpg",
        precio: 200,
        direccion: "Mendoza, Argentina",
        calificacion: 4.8,
        caracteristicas: ["WIFI", "MASCOTAS_PERMITIDAS"]
    }
];