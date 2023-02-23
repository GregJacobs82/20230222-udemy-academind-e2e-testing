// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// NOT A SUFFICIENT COMMAND -- Leaving here for reference - VIDEO: https://www.udemy.com/course/cypress-end-to-end-testing-getting-started/learn/lecture/36409644#overview
// Cypress.Commands.add('submitForm', () => {
//     cy.get('[data-cy="contact-btn-submit"]').click();
// })

// VIDEO EXPLANATION: https://www.udemy.com/course/cypress-end-to-end-testing-getting-started/learn/lecture/36409648#overview
Cypress.Commands.addQuery('getById', (id) => {
    const getFn = cy.now('get', `[data-cy="${id}"]`);
    return() => {
        return getFn(); // const element = getFn(); return element;
    }
})
