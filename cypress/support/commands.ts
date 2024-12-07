export const mockPaymentsApi = () => {
    cy.intercept('GET', '/api/payments', {
      statusCode: 200,
      body: {
        data: [
          {
            name: 'User 1',
            title: 'Payment 1',
            date: '2024-12-07',
            value: 100,
            isPayed: true
          },
          {
            name: 'User 2',
            title: 'Payment 2',
            date: '2024-12-08',
            value: 200,
            isPayed: false
          }
        ]
      }
    }).as('getPayments');
  };
  