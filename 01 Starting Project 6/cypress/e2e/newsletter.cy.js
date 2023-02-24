describe('Newsletter', () => {
    beforeEach(() => {
        cy.task('seedDatabase');
    });

    it('should display success message', () => {
        cy.visit('/');
        cy.get('[data-cy="newsletter-email"]').type('test@example.com');
        cy.get('[data-cy="newsletter-submit"]').click();
        cy.contains('Thanks for signing up!');
    });
});
