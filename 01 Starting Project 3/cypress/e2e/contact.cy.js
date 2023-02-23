describe('contact form', () => {
    beforeEach(()=>{
        cy.visit('http://127.0.0.1:5173/about');
    });

    it('should submit the form by clicking the send button', () => {
        cy.get('[data-cy="contact-input-message"]').type('Some message here');
        cy.get('[data-cy="contact-input-name"]').type('John Doe');
        cy.get('[data-cy="contact-input-email"]').type('test@example.com');
        // cy.get('[data-cy="contact-btn-submit"]')
        //     .contains('Send Message')
        //     .and('not.have.attr', 'disabled');
        cy.get('[data-cy="contact-btn-submit"]')
            .as('submitBtn')
            .then(el => {
                expect(el.text()).to.eq('Send Message');
                expect(el.attr('disabled')).to.be.undefined;
            });
        cy.get('@submitBtn').click();
        cy.get('@submitBtn')
            .contains('Sending...')
            .and('have.attr', 'disabled');
    });

    it('should submit the form by user pressing {enter}', () => {
        cy.get('[data-cy="contact-input-message"]').type('Some message here');
        cy.get('[data-cy="contact-input-name"]').type('John Doe');
        cy.get('[data-cy="contact-btn-submit"]')
            .as('submitBtn')
            .then(el => {
                expect(el.text()).to.eq('Send Message');
                expect(el.attr('disabled')).to.be.undefined;
            });
        cy.get('[data-cy="contact-input-email"]').type('test@example.com{enter}');
        cy.get('@submitBtn')
            .contains('Sending...')
            .and('have.attr', 'disabled');
    });
});
