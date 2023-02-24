/// <reference types="cypress" />

describe('share location', () => {
    const latitude = 32.776474;
    const longitude = -79.931053;
    const name = 'Greg';

    beforeEach(()=> {
        cy.visit('/').then(win => {
            // STUB GET USER LOCATION
            cy.stub(win.navigator.geolocation, 'getCurrentPosition')
                .as('getUserPosition')
                .callsFake(cb => {
                    setTimeout(() => { // todo: i don't like this setTimeout 👎🏼
                        cb({
                            coords: {
                                latitude,
                                longitude,
                            }
                        });
                    }, 100);
                });

            // STUB CLIPBOARD
            cy.stub(win.navigator.clipboard, 'writeText')
                .as('saveToClipboard')
                .resolves();
        });
    });

    it('should fetch the user location', () => {
        cy.get('[data-cy="get-loc-btn"]').click();
        cy.get('@getUserPosition').should('have.been.called');
        cy.get('[data-cy="get-loc-btn"]').should('be.disabled');
        cy.get('[data-cy="actions"]').should('contain', 'Location fetched');
    });

    it('should share a location URL', () => {
        cy.get('[data-cy="name-input"]').type(name);
        cy.get('[data-cy="get-loc-btn"]').click();
        cy.get('[data-cy="share-loc-btn"]').click();
        cy.get('@saveToClipboard')
            .should('have.been.called')
            .and('have.been.calledWithMatch',
                new RegExp(`${latitude}.*${longitude}.*${encodeURI(name)}`)
            );
    });
});
