describe('Authorization', () => {
    beforeEach(() => {
        cy.task('seedDatabase');
    });

    it('should signup', () => {
        cy.userLogin('/signup', 'test2@example.com', 'somepassword');
    });

    it('should login', () => {
        cy.userLogin();
    });

    it('should logout', () => {
        cy.userLogin();
        cy.contains('Logout').click();
        cy.location('pathname').should('eq', '/');
        cy.getCookie('__session').its('value').should('be.empty');
    });
});
