const request = require("supertest");
const { buildTestServer } = require("./utils/server.js");
const { usuarioRoutes } = require("../Routes/usuarioRoutes.js");
const { reservasRoutes } = require("../Routes/reservasRoutes.js");
const { alojamientoRoutes } = require("../Routes/alojamientoRoutes.js");
const express = require('express');

// Build y configuración del server Express
const server = buildTestServer();
server.addRoute(usuarioRoutes);
server.addRoute(reservasRoutes);
server.addRoute(alojamientoRoutes); // por si está separado
server.configureRoutes();
const app = server.app;

describe("Test de integración: GET /alojamientos", () => {
  it("debería devolver alojamientos con al menos 4 huéspedes (pagina 1, limite 2)", async () => {
    const response = await request(app)
      .get("/alojamientos")
      .expect(200);

    // Esperamos la respuesta del servidor el cual devuelve una lista con los alojamientos
    expect(Array.isArray(response.body)).toBe(true);

    //Compramos que solo se muestren 2 ya que el limite esta pre establecido así 
    expect(response.body.length).toBeLessThanOrEqual(2);

    //Checkeamos que la cantidad de huespedes de cada alojamiento permita 4 o más huespedes
    response.body.forEach((alojamiento) => {
      expect(alojamiento.cantHuespedesMax).toBeGreaterThanOrEqual(4);
    });
  });


  it("debería devolver alojamientos con WIFI (pagina 1, limite 4)", async () => {
    const response = await request(app)
      .get("/alojamientos?pagina=1&limite=4&caracteristicas=WIFI")
      .expect(200);
 
    // Esperamos la respuesta del servidor el cual devuelve una lista con los alojamientos
    expect(Array.isArray(response.body)).toBe(true);

    //Compramos que solo se muestren 2 ya que el limite esta pre establecido así 
    expect(response.body.length).toBeLessThanOrEqual(4);

    //Checkeamos que la cantidad de huespedes de cada alojamiento permita 4 o más huespedes
    response.body.forEach((alojamiento) => {
      expect(alojamiento.caracteristicas).toContain("WIFI");
    });
  });

});
