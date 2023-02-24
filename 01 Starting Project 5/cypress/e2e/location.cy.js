/// <reference types="cypress" />

describe('share location', () => {
    let name;
    let latitude;
    let longitude;

    beforeEach(()=> {
        // ASSIGN USER FIXTURE ALIAS DATA TO GLOBAL VARS
        cy.fixture('user1.json').then(user => {
            name = user.name;
            latitude = user.coords.latitude;
            longitude = user.coords.longitude;
        });
        // NOTE: Alternative method is to assign the user fixture to an alias, then destructure data where needed in each individual test. BUT I prefer it here in beforeEach - Greg
        // EXAMPLE:
        //      cy.fixture('user1.json').as('user');
        //      ... later in the individual test, use @alias like:
        //      cy.get('@user').then(user => { const lat = user.coords.latitude });

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
