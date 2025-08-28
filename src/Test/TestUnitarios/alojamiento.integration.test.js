const request = require("supertest");
const { buildTestServer } = require("./utils/server.js");
const { UsuarioService } = require("../../Services/UsuarioService.js");
const { usuarioRoutes } = require("../../Routes/usuarioRoutes.js");
const { reservasRoutes } = require("../../Routes/reservasRoutes.js");
const { AlojamientoService } = require("../../Services/AlojamientoService.js");


const server = buildTestServer()

server.addRoute(usuarioRoutes)
server.addRoute(reservasRoutes)
server.configureRoutes()

const usuarioAnfitrion = {        
    "_id":"664a1234b5e123456789abcd",
    "nombre": "El ANFITRION",
    "email": "anfitrion@gmail.com",
    "tipo": "ANFITRION",
}

const alojamiento = {        
    "_id": "6828e462c44bd535ab17b6d3",
    "anfitrion": "6828ee17e3c519f5603b8a60",
    "nombreAlojamiento": "Casa de los Simpsons",
    "descripcion": "Una cabaña con homero y marge",
    "precioPorNoche": 100,
    "moneda": "DOLAR_USA",
    "horarioCheckIn": "14:00",
    "horarioCheckOut": "11:00",
    "direccion": {
        "calle": "Avenida Siempreviva",
        "altura": 742,
        "ciudad": {
            "nombre": "Springfield",
            "pais": {
                "nombre": "USA",
            },  
        "latitud": "37.21533",
        "longitud": "-93.29824"
        },

    },
     "cantHuespedesMax": 4,
     "caracteristicas": [],
     "fotos": [],
}

const listaAlojamientos = [
        {
                "direccion": {
                    "ciudad": {
                        "pais": {
                            "nombre": "USA"
                        },
                        "nombre": "La PLATA"
                    },
                    "calle": "Calle del Bosque",
                    "altura": 123,
                    "latitud": -34.6037,
                    "longitud": -58.3816
                },
                "caracteristicas": [],
                "_id": "682b92da096fb9a39d36ae30",
                "anfitrion": "682b9238096fb9a39d36ae2b",
                "nombreAlojamiento": "Cabaña El Bosque",
                "descripcion": "Una cabaña acogedora rodeada de bosque",
                "precioPorNoche": 100,
                "moneda": "DOLAR_USA",
                "horarioCheckIn": "14:00",
                "horarioCheckOut": "11:00",
                "cantHuespedesMax": 4,
                "v": 0,
                "fotos": []
            },
            // -------------------------
            {
                "direccion": {
                    "ciudad": {
                        "pais": {
                            "nombre": "Suiza"
                        },
                        "nombre": "Zurich"
                    },
                    "calle": "Camino del Lago",
                    "altura": 456,
                    "latitud": 47.3769,
                    "longitud": 8.5417
                },
                "caracteristicas": [],
                "_id": "682b9372096fb9a39d36ae35",
                "anfitrion": "682b9238096fb9a39d36ae2b",
                "nombreAlojamiento": "Casa del Lago Azul",
                "descripcion": "Casa rústica con vista al lago",
                "precioPorNoche": 200,
                "moneda": "REALES",
                "horarioCheckIn": "13:00",
                "horarioCheckOut": "12:00",
                "cantHuespedesMax": 6,
                "v": 0,
                "fotos": []
            },
            // -------------------------
            {
                "direccion": {
                    "ciudad": {
                        "pais": {
                            "nombre": "Argentina"
                        },
                        "nombre": "Mar del Plata"
                    },
                    "calle": "Ruta 10",
                    "altura": 3210,
                    "latitud": -38.0055,
                    "longitud": -57.5426
                },
                "caracteristicas": [],
                "_id": "682b93a4096fb9a39d36ae39",
                "anfitrion": "682b9238096fb9a39d36ae2b",
                "nombreAlojamiento": "Villa del Sol",
                "descripcion": "Hermosa villa con piscina privada",
                "precioPorNoche": 300,
                "moneda": "PESO_ARG",
                "horarioCheckIn": "12:00",
                "horarioCheckOut": "10:00",
                "cantHuespedesMax": 8,
                "__v": 0,
                "fotos": []
            }
        ]
        const villaDelSol = {
            direccion: {
                ciudad: {
                    pais: { nombre: "Argentina" },
                    nombre: "Mar del Plata"
                },
                calle: "Ruta 10",
                altura: 3210,
                latitud: -38.0055,
                longitud: -57.5426
            },
            caracteristicas: [],
            _id: "682b93a4096fb9a39d36ae39",
            anfitrion: "682b9238096fb9a39d36ae2b",
            nombreAlojamiento: "Villa del Sol",
            descripcion: "Hermosa villa con piscina privada",
            precioPorNoche: 300,
            moneda: "PESO_ARG",
            horarioCheckIn: "12:00",
            horarioCheckOut: "10:00",
            cantHuespedesMax: 8,
            __v: 0,
            fotos: []
        };

test("GET /obtenerAlojamientosPorFiltros - filtro por huespedes=4 y pagina=2 (limite=2)", async () => {
            const mockAlojamientoRepository = {
                buscarConFiltros: jest.fn().mockResolvedValue([villaDelSol])
            };
        
            const service = new AlojamientoService(mockAlojamientoRepository);
        
            const filtros = {
                huespedes: 4,
                pagina: 2,
                limite: 2
            };
        
            const resultado = await service.obtenerAlojamientosPorFiltros(filtros);
            expect(resultado).toEqual([villaDelSol]);        
            expect(resultado).toHaveLength(1); // solo queda uno en la página 2
            expect(resultado[0].nombreAlojamiento).toBe("Villa del Sol");
        });

test("POST /alojamientos", async () => { 
    const mockAlojamientosRepository = {
        crearAlojamiento: jest.fn().mockResolvedValue(alojamiento)
    }
    const alojamientoService = new AlojamientoService(mockAlojamientosRepository)
    const alojamientoCreado =  await alojamientoService.crearAlojamiento(alojamiento);

    expect(mockAlojamientosRepository.crearAlojamiento).toHaveBeenCalledWith(alojamiento)
    expect(alojamientoCreado).toEqual(alojamiento);
})