describe('PaymentsComponent Tests', () => {
    beforeEach(() => {
        cy.visit('/payments');
        mockPaymentsApi();
        cy.wait('@getPayments');
    });
  
    it('should display the payments table when data is available', () => {
      cy.get('.table-container').should('be.visible');
      cy.get('table mat-row').should('have.length', 2);
    });
  
    it('should open the Add Payment dialog when the add button is clicked', () => {
      cy.get('div.alignEnd button').click();
      cy.get('mat-dialog-container').should('be.visible');
      cy.get('mat-dialog-container').contains('Adicionar');
    });
  
    it('should filter table rows based on the input search', () => {
      cy.get('input[matInput]').type('User 1');
      cy.get('table mat-row').should('have.length', 1);
      cy.get('table mat-row').contains('User 1');
    });
  
    it('should open the Edit dialog when the Edit button is clicked', () => {
      cy.get('button[color="primary"]').click();
      cy.get('mat-dialog-container').should('be.visible');
      cy.get('mat-dialog-container').contains('Editar');
    });
  
    it('should open the Delete dialog when the Delete button is clicked', () => {
      cy.get('button[color="warn"]').click();
      cy.get('mat-dialog-container').should('be.visible');
      cy.get('mat-dialog-container').contains('Deletar');
    });
  });
  