describe('contact form', () => {
    beforeEach(()=>{
        cy.visit('http://127.0.0.1:5173/about');

        // ASSIGN ALIAS' TO INPUT EL's
        cy.get('[data-cy="contact-input-message"]').as('inputMsg');
        cy.get('[data-cy="contact-input-name"]').as('inputName');
        cy.get('[data-cy="contact-input-email"]').as('inputEmail');
        cy.get('[data-cy="contact-btn-submit"]').as('btnSubmit');
    });

    it('should submit the form by clicking the send button', () => {
        cy.get('@inputMsg').type('Some message here');
        cy.get('@inputName').type('John Doe');
        cy.get('@inputEmail').type('test@example.com');
        // cy.get('@btnSubmit')
        //     .contains('Send Message')
        //     .and('not.have.attr', 'disabled');
        cy.get('@btnSubmit')
            .then(el => {
                expect(el.text()).to.eq('Send Message');
                expect(el.attr('disabled')).to.be.undefined;
            });
        cy.get('@btnSubmit').click();
        cy.get('@btnSubmit')
            .contains('Sending...')
            .and('have.attr', 'disabled');
    });

    it('should submit the form by user pressing {enter}', () => {
        cy.get('@inputMsg').type('Some message here');
        cy.get('@inputName').type('John Doe');
        cy.get('@btnSubmit')
            .then(el => {
                expect(el.text()).to.eq('Send Message');
                expect(el.attr('disabled')).to.be.undefined;
            });
        cy.get('@inputEmail').type('test@example.com{enter}');
        cy.get('@btnSubmit')
            .contains('Sending...')
            .and('have.attr', 'disabled');
    });

    it('should validate the form input', () => {
        cy.get('@btnSubmit')
            .click();
        cy.get('@btnSubmit').then(el => {
            expect(el).to.not.have.attr('disabled');
            expect(el.text()).to.not.equal('Sending...');
            expect(el.text()).to.equal('Send Message');
        });

        // Check classes on blur
        cy.get('@inputMsg')
            .focus()
            .blur();
        cy.get('@inputMsg')
            .parent()
            .should('have.attr', 'class')
            .and('contains', 'invalid');

        cy.get('@inputName')
            .focus()
            .blur();
        cy.get('@inputName')
            .parent()
            .should('have.attr', 'class')
            .and('contains', 'invalid');

        cy.get('@inputEmail')
            .focus()
            .blur();
        cy.get('@inputEmail')
            .parent()
            .should('have.attr', 'class')
            .and('contains', 'invalid');

    })
});
