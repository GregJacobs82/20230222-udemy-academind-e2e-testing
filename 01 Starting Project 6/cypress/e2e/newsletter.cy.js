describe('Newsletter', () => {
    beforeEach(() => {
        cy.task('seedDatabase');
    });

    it('should display success message', () => {
        cy.intercept('POST', '/newsletter*', { status: 201 }) // intercept any HTTP request localhost:3000/newsletter?anything - VIDEO: https://www.udemy.com/course/cypress-end-to-end-testing-getting-started/learn/lecture/36409762
            .as('subscribe');
        cy.visit('/');
        cy.get('[data-cy="newsletter-email"]').type('test@example.com');
        cy.get('[data-cy="newsletter-submit"]').click();
        cy.wait('@subscribe')
        cy.contains('Thanks for signing up!');
    });

    it('should display validation errors', () => {
        cy.intercept('POST', '/newsletter*', { message: 'This email is already subscribed.' }) // Stop HTTP request & provide message response - VIDEO: https://www.udemy.com/course/cypress-end-to-end-testing-getting-started/learn/lecture/36409770
            .as('subscribe');
        cy.visit('/');
        cy.get('[data-cy="newsletter-email"]').type('test@example.com');
        cy.get('[data-cy="newsletter-submit"]').click();
        cy.wait('@subscribe')
        cy.contains('This email is already subscribed.');
    });
});
