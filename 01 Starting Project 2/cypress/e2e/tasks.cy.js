describe('tasks management', () => {
    beforeEach(()=>{
        cy.visit('http://127.0.0.1:5173');
        cy.get('[data-cy="start-add-task-button"]').click();
    });

    it('should open and close the new task modal by clicking the backdrop', () => {
        cy.get('.backdrop').click({force: true});
        cy.get('.backdrop').should('not.exist');
        cy.get('.modal').should('not.exist');
    });

    it('should open and close the modal by clicking the Cancel button', () => {
        cy.get('button').contains('Cancel').click();
        cy.get('.backdrop').should('not.exist');
        cy.get('.modal').should('not.exist');
    });

    it('should create a new task', () => {
        cy.get('#title').type('New Task');
        cy.get('#summary').type('Some task description here');
        cy.get('.modal').contains('Add Task').click();
        cy.get('.task').should('have.length', 1);
        cy.get('.task h2').should('contain', 'New Task');
        cy.get('.task p').should('contain', 'Some task description here');
    });

    it('should display error if user does not enter task content', () => {
        cy.get('.modal').contains('Add Task').click();
        cy.get('.modal .error-message')
            .should('exist')
            .should('contain', 'Please provide values');
    });

    it.only('should filter tasks category "URGENT" type', () => {
        // ADD TASK 1
        cy.get('#title').type('New Task');
        cy.get('#summary').type('Some task description here');
        cy.get('#category').select('urgent');
        cy.get('.modal').contains('Add Task').click();

        // ADD TASK 2
        cy.get('[data-cy="start-add-task-button"]').click();
        cy.get('#title').type('Go to the store');
        cy.get('#summary').type('Buy some eggs and milk');
        cy.get('#category').select('urgent');
        cy.get('.modal').contains('Add Task').click();

        // ADD TASK 3 (not urgent)
        cy.get('[data-cy="start-add-task-button"]').click();
        cy.get('#title').type('Normal Task');
        cy.get('#summary').type('This is not urgent and is normal');
        cy.get('.modal').contains('Add Task').click();

        // FILTER URGENT AND CHECK # OF TASKS
        cy.get('#filter').select('urgent');
        cy.get('.task')
            .should('have.length', 2)
            .first('contains', 'New Task')
        cy.get('.task').eq(1).should('contain', 'Go to the store')
        cy.get('.task').eq(2).should('not.exist');
        // cy.get('.task-list').then((list)=> {
        //         expect(list).to.have.length(1);
        //     });
    });
});
