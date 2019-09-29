describe('Fist test :)', () => {
    beforeEach(() => {
        cy.server();
        cy.route({
            method: 'GET',
            url: 'http://www.mocky.io/v2/5d8f7cd03200005d00adec78',
            response: {
                "success": false
            }
        })
    });

    it('Should open browser', () => {
        cy.visit('http://localhost:3000');
        cy.viewport('iphone-6');

        // Given
        cy.get('div.counter').should('exist');
        cy.get('span.render-props-counter').should('contain', 0);

        // When
        cy.get('button.counter-increase').click();

        cy.debug();

        // Then
        cy.get('span.render-props-counter').should('contain', 1);
        cy.get('._result').should('contain', false);
    });

    // it('Should open ninjagrill', () => {
    //     cy.visit('https://ninjagrill-pl.upmenusite.com/menu');
    //     // Add product
    //     cy.get('.btn.theme-plus-btn').first().click();
    //     cy.get('._buying-flow-finish.hidden-xs').first().click({force: true});

    //     // Add again
    //     cy.get('.btn.theme-plus-btn').first().click();
    //     cy.get('._buying-flow-finish.hidden-xs').first().click({force: true});

    //     cy.wait(1000);
    //     cy.get('._start-order').first().click({force: true});

    //     // Order
    //     cy.wait(1000);
    //     cy.get('input[name="paymentType"]').check({force: true});
    //     cy.get('input[name="deliveryType"]').check('TAKEAWAY', {force: true},);
    //     cy.get('input[name="firstName"]').type('Adam', {force: true});
    //     cy.get('input[name="lastName"]').type('Kowalski', {force: true});
    //     cy.get('input[name="email"]').type('automateduitest@upmenu.com', {force: true});
    //     cy.get('input[name="phone"]').type('000000000', {force: true});
    //     cy.get('input[name="termsOfService"]').check({force: true});
    //     cy.get('.hidden-xs._order-form-submit').click({force: true});

    //     cy.get('#order-noty').should('exist');
    // })
});