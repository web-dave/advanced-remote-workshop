describe('As a user I want to see the heading of my app.', () => {
  before(() => {
    cy.visit('/');
  });
  it('And it should say Book Monkey', () => {
    cy.get('.mat-toolbar').contains('BOOK MONKEY').click();
  });
});
