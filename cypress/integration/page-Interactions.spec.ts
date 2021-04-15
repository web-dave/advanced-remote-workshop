describe('As a user I want to check if a book can be created.', () => {
  const randomISBN = Math.floor(1000000000000 + Math.random() * 900000);
  before(() => {
    cy.visit('/');
    cy.get('.mat-card').as('books');
  });
  after(() => {
    cy.request('DELETE', 'http://localhost:4730/books/' + randomISBN);
  });
  it('should increase the number of books by 1', () => {
    let booksCount = 0;
    cy.get('@books').then(list => {
      booksCount = list.length;
      cy.get('[routerlink="books/new"]').click();
      cy.url().should('include', 'books/new');
      cy.get('.mat-raised-button').should('be.disabled');
      cy.get('[formControlName="isbn"]').type(randomISBN.toString());
      cy.get('[formControlName="title"]').type('ölksdföksajdf');
      cy.get('[formControlName="author"]').type('Me');
      cy.get('[formControlName="cover"]').type('https://picsum.photos/200/300');
      cy.get('.mat-raised-button').should('not.be.disabled').click();
      cy.get('@books').then(list => {
        expect(booksCount + 1).to.equal(list.length);
      });
    });
  });
});
