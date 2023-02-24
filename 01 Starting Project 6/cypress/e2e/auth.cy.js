describe('Authorization', () => {
    beforeEach(() => {
        cy.task('seedDatabase');
    });

    it('should signup', () => {
        cy.submitUser('/signup', 'test2@example.com', 'somepassword');
    });

    it('should login', () => {
        cy.submitUser('/login', 'test@example.com', 'testpassword');
    });

    it('should logout', () => {
        cy.submitUser('/login', 'test@example.com', 'testpassword');
        cy.contains('Logout').click();
        cy.location('pathname').should('eq', '/');
        cy.getCookie('__session').its('value').should('be.empty');
    });
});
