describe('GoREST API – GET, POST, PUT, DELETE tests with token', function () {
    before(function () {

        cy.fixture('gorest').then((data) => {
            this.token = data.token;


            const user = {
                name: "QA Tester",
                email: `qa_${Date.now()}@mail.com`,
                gender: "male",
                status: "active",
            };

            cy.request({
                method: "POST",
                url: "https://gorest.co.in/public/v2/users",
                headers: {
                    Authorization: this.token,
                },
                body: user,
            }).then((res) => {
                expect(res.status).to.eq(201);
                this.userId = res.body.id;
            });
        });
    });

    it("GET /users – should return list of users", function () {
        cy.request({
            method: "GET",
            url: "https://gorest.co.in/public/v2/users",
            headers: {
                Authorization: this.token,
            },
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.be.an("array");
            expect(res.body[0]).to.have.property("id");
        });
    });

    it("GET /users/:id – should return user details", function () {
        cy.request({
            method: "GET",
            url: `https://gorest.co.in/public/v2/users/${this.userId}`,
            headers: {
                Authorization: this.token,
            },
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property("id", this.userId);
        });
    });
});