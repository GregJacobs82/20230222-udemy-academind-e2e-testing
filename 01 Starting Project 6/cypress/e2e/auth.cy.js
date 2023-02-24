describe('Authorization', () => {
    beforeEach(() => {
        cy.task('seedDatabase');
    });

    it('should signup', () => {
        cy.visit('/signup');
        cy.submitUser('test2@example.com', 'somepassword');
    });

    it('should login', () => {
        cy.visit('/login');
        cy.submitUser('test@example.com', 'testpassword');
    });

    it('should logout', () => {
        cy.visit('/login');
        cy.submitUser('test@example.com', 'testpassword');
        cy.contains('Logout').click();
        cy.location('pathname').should('eq', '/');
        cy.getCookie('__session').its('value').should('be.empty');
    });
});
