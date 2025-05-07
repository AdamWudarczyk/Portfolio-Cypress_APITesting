describe('GoREST API – testy GET z tokenem', function () {
    before(function () {
        cy.fixture('gorest').then((data) => {
            this.token = data.token;
        });
    });

    it('GET /users – lista użytkowników', function () {
        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {
                Authorization: this.token
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            expect(response.body[0]).to.have.property('id');
            expect(response.body[0]).to.have.property('email');
        });
    });
});