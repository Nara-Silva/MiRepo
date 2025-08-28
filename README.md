## Guia de uso de la aplicacion
Primero que nada es necesario clonar el proyecto en tu pc con el comando:
```bash
git clone https://github.com/ddso-utn/tp-cuatrimestral-jueves-manana-ju-ma-grupo-04.git
``` 
Luego hay que abrir la carpeta del repositorio posicionandote sobre ella previamente:
```bash
cd /tp-cuatrimestral-jueves-manana-ju-ma-grupo-04.git
code .
``` 

## Dependencias
Para instalar las dependencias:
`npm install`<br>
Como resultado te va a aparecer una carpeta llamada node_modules 

## Variables de entorno
.env para desplegar el servidor back end:
- `MONGODB_URI=<Uri del servidor de mongo>`
- `MONGODB_DB_NAME=birbnb`
- `PORT=3001`
- `FRONTEND_URL = http://localhost:3000`

.env para desplegar el front end:
  - `REACT_APP_API_URL=http://localhost:3001`
  - `REACT_APP_KEYCLOAK_URL=http://localhost:8080`
  - `REACT_APP_KEYCLOAK_REALM=Birbnb`
  - `REACT_APP_KEYCLOAK_CLIENT_ID=front-end-birbn`

## Keycloak
Es necesario desplegar un entorno de keycloak y ahi asignar los nombres correspondientes al realm y al cliente


Para correr el back es necesario posicionarse en ./src y ejecutar el comando
- `node index.js`  
  
Tambien asegurarse de tener instalado mongoDB para manejar la base de datos y establecer la conexion completando la variable de entorno previamente mencionada


## Front End
para correr la pagina en el front es necesario posicionarse en ./birbnb y ejecutar el comando
- `npm start`

## Tests
`npm run test src/Test/testIntegracionFinal.test.js`

## HealthCheck
primero es necesario iniciar el servidor y luego acceder al endpoint agregando "/health", desde el navegador o con curl en otra terminal
