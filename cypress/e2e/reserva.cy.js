Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('postMessage') || err.message.includes("reading 'postMessage'")) {
    return false; // Ignora ese error
  }
});

describe('Reserva de un alojamiento', () => {
  it('debería loguearse, elegir un alojamiento y reservarlo', () => {
    cy.visit('http://localhost:3000');

    // 1) Hacemos clic en el botón que redirige a Keycloak
    cy.get('.login-link').click();

    // 2) Cypress detecta el cambio de origen y necesitamos usar cy.origin
    cy.origin('http://localhost:8080', () => {
      // 3) Dentro de este bloque estamos "dentro" de Keycloak
      // completamos las entradas con datos que sean validos para realizar el login
      cy.get('input#username').should('be.visible').type('benigc');
      cy.get('input#password').should('be.visible').type('1234');
      cy.get('button[type="submit"]').click();
    });

    // 4) Una vez que vuelve a tu app, podés validar que está logueado
    cy.url().should('include', 'localhost:3000');

    cy.get('.slick-slider').should('exist');

    cy.get('.slick-slider .link-alojamiento').first().click({ force: true });

    cy.url().should('include', '/alojamientos/');

    cy.get('.btn-reservar').should('be.visible').click();

    cy.get('.dia.dia.libre[title="Fri Jul 11 2025"]').click();
    cy.get('.dia.dia.libre[title="Tue Jul 15 2025"]').click();
    
    // Esperar a que se seteen las fechas en los inputs visibles
    cy.get('input[type="date"]').first().should('have.value', '2025-07-11');
    cy.get('input[type="date"]').last().should('have.value', '2025-07-15');

    // Ahora sí hacemos clic en "Siguiente"
    cy.get('.boton-continuar')
      .and('not.be.disabled')
      .click();

    cy.get('.formulario-datos', { timeout: 7000 }).should('be.visible');

    // PASO 2 DEL W

    // Completo datos del formulario 
    cy.get('input[name="nombre"]').type('beni')
    cy.get('input[name="apellido"]').type('beni')
    cy.get('input[name="email"]').type('beni@gmail.com')
    cy.get('input[name="telefono"]').type('1133112675')
    cy.get('input[name="documento"]').type('46579561')
    cy.get('input[name="pais"]').type('Argentina')
    cy.get('input[name="ciudad"]').type('Buenos Aires')
    cy.get('input[name="direccion"]').type('Dirrectorio 4028')
    cy.get('input[name="codigoPostal"]').type('1407')

    cy.get('.boton-principal')
    .and('not.be.disabled')
    .click();

    // PASO 3 DEL WIZARD
    // Completo datos para el medio de pago
    cy.get('input[name="cardNumber"]').type('4384 5441 4860 6077')
    cy.get('input[name="expiryDate"]').type('01/29')
    cy.get('input[name="cvc"]').type('123')

    // PASO 4 DEL WIZARD
    cy.get('.pago-primario')
    .and('not.be.disabled')
    .click();

    cy.get('.boton-confirmar')
    .and('not.be.disabled')
    .click();

    // Verificar que se muestre el mensaje de éxito
    cy.get('.titulo-exito')
      .should('be.visible')
      .and('contain', '¡Reserva creada exitosamente!');

    // Verificar que el botón de volver esté visible, habilitado y hacer clic en él  
    cy.get('.boton-volver')
    .and('not.be.disabled')
    .click();

    // Verificar que la reserva se muestre en la lista de reservas 
    cy.get('.reserva-card')
      .should('be.visible')

  });
});
