describe('page navigation', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should navigate between pages', () => {
        cy.get('[data-cy="header-about-link"]').click();
        cy.location('pathname').should('eq', '/about');
        cy.get('[data-cy="header-home-link"]').click();
        cy.location('pathname').should('eq', '/');
        cy.get('[data-cy="header-about-link"]').click();
        cy.location('pathname').should('eq', '/about');
        cy.go('back');
        cy.location('pathname').should('eq', '/');
    });
});
