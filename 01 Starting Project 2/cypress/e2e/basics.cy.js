describe('tasks page', () => {
    beforeEach(()=>{
        cy.visit('http://127.0.0.1:5173');
    });

    it('should render the main image', () => {
        cy.get('.main-header').find('img');
    });

    it('should display the page title', () => {
        // cy.get('h1').should('contain', 'React Tasks');
        cy.get('h1')
            .should('have.length', 1)
            .contains('My Cypress Course Tasks');
    });
});
