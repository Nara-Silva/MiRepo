## Pruebas en Mongo

- primero se ingresan usuarios:
```json
{  
    "nombre": "El ANFITRION Juan Pérez",
    "email": "juan@gmail.com",
    "tipo": "ANFITRION"
}
{  
    "nombre": "El HUESPED carlitos",
    "email": "carlitos@gmail.com",
    "tipo": "HUESPED"
}
```

- luego algunos alojamientos:
```json
{
    "anfitrion": "id del anfitrion",
    "nombreAlojamiento": "Apartamento Central Park",
    "descripcion": "Moderno apartamento frente a Central Park",
    "precioPorNoche": 150,
    "moneda": "DOLAR_USA",
    "horarioCheckIn": "15:00",
    "horarioCheckOut": "10:00",
    "direccion": {
        "calle": "5th Avenue",
        "altura": 789,
        "ciudad": {
            "nombre": "New York",
            "pais": {
                "nombre": "USA"
            }
        },
        "latitud": 40.785091,
        "longitud": -73.968285
    },
    "cantHuespedesMax": 2
}
{
    "anfitrion": "id del anfitrion",
    "nombreAlojamiento": "Casa del Lago Azul",
    "descripcion": "Casa rústica con vista al lago",
    "precioPorNoche": 200,
    "moneda": "PESO_ARG",
    "horarioCheckIn": "13:00",
    "horarioCheckOut": "12:00",
    "direccion": {
        "calle": "Camino del Lago",
        "altura": 456,
        "ciudad": {
            "nombre": "Zurich",
            "pais": {
                "nombre": "Suiza"
            }
        },
        "latitud": 47.3769,
        "longitud": 8.5417
    },
    "cantHuespedesMax": 6,
    "caracteristicas": ["PISCINA", "MASCOTAS_PERMITIDAS"]
} 
```

- Se crea la reserva:
```json
{
    "id_huespedReservador": "id del huesped",
    "cantHuespedes": 2,
    "id_alojamiento": "id de un alojamiento",
    "fechaInicio": "2025/09/23",
    "fechaFin": "2025/09/25"
}
```

- para cancelar una reserva, se busca el id de la reserva y se hace put reservas/cancelar/idReserva, los motivos son opcionales y se agregan en los bodys

# Notificaciones
- Para confirmar una reserva, el anfitrion debe buscar la reserva pendiente en sus notificaciones sin leer, y hacer un put de reservas/confirmar con el id de esa reserva
- el resto de endpoints de notificaciones estan en las rutas
