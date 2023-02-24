/// <reference types="cypress" />

describe('share location', () => {
    let name;
    let latitude;
    let longitude;
    let expectedUrl;

    beforeEach(()=> {
        cy.clock(); // this is required for manipulating the setTimeout 2000 on the info-message - VIDEO: https://www.udemy.com/course/cypress-end-to-end-testing-getting-started/learn/lecture/36409722#notes

        // ASSIGN USER FIXTURE ALIAS DATA TO GLOBAL VARS
        cy.fixture('user1.json').then(user => {
            name = user.name;
            latitude = user.coords.latitude;
            longitude = user.coords.longitude;
            expectedUrl = new RegExp(`${latitude}.*${longitude}.*${encodeURI(name)}`);
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

            // SPY THE LOCATION URL
            cy.spy(win.localStorage, 'setItem').as('setLocalLocation');
            cy.spy(win.localStorage, 'getItem').as('getLocalLocation');
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

        // VERIFY CLIPBAORD WAS STUBBED
        cy.get('@saveToClipboard')
            .should('have.been.called')
            .and('have.been.calledWithMatch', expectedUrl);

        // VERIFY LOCAL STORAGE WAS SPIED
        cy.get('@setLocalLocation')
            .should('have.been.called')
            .and('have.been.calledWithMatch', name, expectedUrl);

        // CLICK AGAIN AND VERIFY IT USES LOCAL STORAGE
        cy.get('[data-cy="share-loc-btn"]').click();
        cy.get('@getLocalLocation').should('have.been.called');

        // CHECK THE INFO MESSAGE APPEARS AND DISAPPEARS
        cy.get('[data-cy="info-message"]')
            .should('be.visible')
            .and('have.class', 'visible');
        cy.tick(2000); // MANIPULATE THE CLOCK! - NOTE: cy.clock() is required "before" the test is initialized (see in beforeEch()) - VIDEO: https://www.udemy.com/course/cypress-end-to-end-testing-getting-started/learn/lecture/36409722#notes
        cy.get('[data-cy="info-message"]').should('not.be.visible');
    });
});
