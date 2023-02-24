/// <reference types="Cypress" />

describe('Takeaways', () => {
    beforeEach(() => {
        cy.task('seedDatabase');
    });

    it('should display a list of fetched takeaways', () => {
        cy.visit('/');
        cy.get('[data-cy="takeaway-item"]').should('have.length', 2);
    });

    it.only('should add a new takeaway', () => {
        cy.userLogin();
        cy.intercept('POST', '/takeaways/new*', 'success').as('createTakeaway');
        cy.contains('Add a new takeaway').click();
        cy.location('pathname').should('eq', '/takeaways/new');
        cy.get('[data-cy="title"]').click();
        cy.get('[data-cy="title"]').type('TestTitle1');
        cy.get('[data-cy="body"]').type('TestBody1');
        cy.get('[data-cy="create-takeaway"]').click();
        cy.wait('@createTakeaway')
            .its('request.body')
            .should('match', /TestTitle1.*TestBody1/)

        // cy.location('pathname').should('eq', '/takeaways');
        // cy.get('takeaway').should('have.length', 3);
    })
});
