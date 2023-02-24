describe('Authorization', () => {
    beforeEach(() => {
        cy.task('seedDatabase');
    });

    it('should signup', () => {
        cy.visit('/signup');
        cy.get('[data-cy="auth-email"]').click();
        cy.get('[data-cy="auth-email"]').type('test2@example.com');
        cy.get('[data-cy="auth-password"]').type('testpassword');
        cy.get('[data-cy="auth-submit"]').click();
        cy.location('pathname').should('eq', '/takeaways');
        cy.getCookie('__session').its('value').should('not.be.empty'); // VIDEO: https://www.udemy.com/course/cypress-end-to-end-testing-getting-started/learn/lecture/36409782
    });

    it.only('should login', () => {
        cy.visit('/login');
        cy.get('[data-cy="auth-email"]').click();
        cy.get('[data-cy="auth-email"]').type('test@example.com');
        cy.get('[data-cy="auth-password"]').type('testpassword');
        cy.get('[data-cy="auth-submit"]').click();
        cy.location('pathname').should('eq', '/takeaways');
        cy.getCookie('__session').its('value').should('not.be.empty');
    });
});
