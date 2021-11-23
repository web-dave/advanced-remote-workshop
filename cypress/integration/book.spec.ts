describe('As a user I want to', () => {
  const randomISBN = String(Math.floor(1000000000000 + Math.random() * 900000));
  before(() => {
    cy.visit('/');
  });
  it('see the heading of my app.', () => {
    findTExtInElem('mat-toolbar', 'BOOK MONKEY');
  });
  it('check if a book can be created.', () => {
    // go to new Book
    cy.get('[routerlink="books/new"]').click();
    // save btn disabled
    cy.get('[type="submit"]').should('be.disabled');
    // Fill out Form

    cy.get('input[formControlName="isbn"]').type(randomISBN);
    cy.get('input[formControlName="isbn"]').clear();
    cy.get('input[formControlName="isbn"]').blur();
    cy.get('mat-error').contains('ISBN');
    cy.get('input[formControlName="isbn"]').type(randomISBN);

    cy.get('input[formControlName="title"]').type(randomISBN);
    cy.get('input[formControlName="author"]').type(randomISBN);
    cy.get('input[formControlName="cover"]').type(randomISBN);
    // Savebtn free
    cy.get('[type="submit"]').should('not.be.disabled');
    // cancel
    cy.get('.mat-button').click();
    cy.get(`[ng-reflect-router-link="${randomISBN}"]`).should('not.exist');

    cy.get('[routerlink="books/new"]').click();

    // fill out Form
    cy.get('input[formControlName="isbn"]').type(randomISBN);
    cy.get('input[formControlName="title"]').type(randomISBN);
    cy.get('input[formControlName="author"]').type(randomISBN);
    cy.get('input[formControlName="cover"]').type(randomISBN);

    // save
    cy.get('.mat-raised-button').click();
    // find book in list
    cy.get(`[ng-reflect-router-link="${randomISBN}"]`).should('exist');
  });
});

const findTExtInElem = (elem: string, text: string) => cy.get(elem).contains(text);
