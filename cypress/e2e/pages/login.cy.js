describe('Formulário de Login', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('Deve exibir mensagens de erro ao tentar enviar com campos vazios', () => {
      cy.get('input[formControlName="userEmail"]').click();
      cy.get('input[formControlName="password"]').click();
      cy.get('input[formControlName="userEmail"]').click();      
      cy.contains('E-mail é obrigatório').should('be.visible');
      cy.contains('Senha é obrigatório').should('be.visible');
    });
  
    it('Deve desabilitar o botão Confirmar com formulário inválido', () => {
      cy.get('button[type="submit"]').should('be.disabled');
      cy.get('input[formControlName="userEmail"]').type('usuario@gmail.com');
      cy.get('button[type="submit"]').should('be.disabled');
      cy.get('input[formControlName="password"]').type('senha123');
      cy.get('button[type="submit"]').should('not.be.disabled');
    });
  
    it('Deve permitir login com dados válidos', () => {
      cy.get('input[formControlName="userEmail"]').type('usuario@gmail.com');
      cy.get('input[formControlName="password"]').type('senha123');
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/login'); 
    });
  
    it('Deve exibir erro de credenciais inválidas', () => {
      cy.get('input[formControlName="userEmail"]').type('invalido@email.com');
      cy.get('input[formControlName="password"]').type('senhaerrada');
      cy.get('button[type="submit"]').click();
      cy.contains('E-mail ou Senha incorreto').should('be.visible');
    });
  
    it('Deve alternar a visibilidade da senha', () => {
      cy.get('input[formControlName="password"]').should('have.attr', 'type', 'password');
      cy.get('mat-icon').contains('visibility').click();
      cy.get('input[formControlName="password"]').should('have.attr', 'type', 'text');
    });
  });
  