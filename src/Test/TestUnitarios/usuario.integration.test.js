const request = require("supertest");
const { buildTestServer } = require("./utils/server.js");
const { UsuarioService } = require("../../Services/UsuarioService.js");
const { usuarioRoutes } = require("../../Routes/usuarioRoutes.js");
const { reservasRoutes } = require("../../Routes/reservasRoutes.js");

const server = buildTestServer()

server.addRoute(usuarioRoutes)
server.addRoute(reservasRoutes)
server.configureRoutes()


const usuarioAnfitrion = {
    "_id": "999a1234b5e123456789abcd",
    "nombre": "El ANFITRION",
    "email": "anfitrion@gmail.com",
    "tipo": "ANFITRION"
}

test('Debe crear un usuario anfitrion', async() => {
    const mockUsuarioRepository = {
        crearUsuario: jest.fn().mockResolvedValue(usuarioAnfitrion)
    }
    const usuarioService = new UsuarioService(mockUsuarioRepository)
    const usuarioCreado =  await usuarioService.crearUsuario("999a1234b5e123456789abcd");

    expect(mockUsuarioRepository.crearUsuario).toHaveBeenCalledWith("999a1234b5e123456789abcd")
    expect(usuarioCreado).toEqual({
        nombre: "El ANFITRION",
        email: "anfitrion@gmail.com",
        tipo: "ANFITRION",
      });

})
