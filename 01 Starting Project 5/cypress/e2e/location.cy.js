/// <reference types="cypress" />

describe('share location', () => {
    it('should fetch the user location', () => {
        cy.visit('/').then(win => {
            cy.stub(win.navigator.geolocation, 'getCurrentPosition')
                .as('getUserPosition')
                .callsFake(cb => {
                    setTimeout(() => { // todo: i don't like this setTimeout 👎🏼
                        cb({
                            coords: {
                                latitude: '32.776474',
                                longitude: '-79.931053',
                            }
                        });
                    }, 100);
                });
        });
        cy.get('[data-cy="get-loc-btn"]').click();
        cy.get('@getUserPosition').should('have.been.called');
        cy.get('[data-cy="get-loc-btn"]').should('be.disabled');
        cy.get('[data-cy="actions"]').should('contain', 'Location fetched');
    });
});
