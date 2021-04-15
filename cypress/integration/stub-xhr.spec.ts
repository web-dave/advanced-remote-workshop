describe('As a user I want to check if a book can be created.', () => {
  before(() => {
    cy.intercept('http://localhost:4730/books', { fixture: 'books' });
    cy.visit('/');
    cy.get('.mat-card').as('books');
  });
  it('should show 5 books', () => {
    cy.get('@books').then(list => expect(list.length).to.equal(5));
    cy.screenshot();
  });
});
