describe('GoREST API – testy GET z tokenem', function () {
    before(function () {
        cy.fixture('gorest').then((data) => {
            this.token = data.token;
        });
    });

    it("GET /users – lista użytkowników", function () {
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

    it("POST /users – tworzy użytkownika", function () {
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
            expect(res.body).to.have.property("id");
            cy.wrap(res.body.id).as("userId");
        });
    });

    it("GET /users/:id – szczegóły użytkownika", function () {
        cy.get("@userId").then((id) => {
            cy.request({
                method: "GET",
                url: `https://gorest.co.in/public/v2/users/${id}`,
                headers: {
                    Authorization: this.token,
                },
            }).then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body).to.have.property("id", id);
            });
        });
    });

    it("PUT /users/:id – aktualizacja danych", function () {
        cy.get("@userId").then((id) => {
            cy.request({
                method: "PUT",
                url: `https://gorest.co.in/public/v2/users/${id}`,
                headers: {
                    Authorization: this.token,
                },
                body: {
                    name: "Zmieniony QA",
                },
            }).then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body.name).to.eq("Zmieniony QA");
            });
        });
    });

    it("DELETE /users/:id – usuwa użytkownika", function () {
        cy.get("@userId").then((id) => {
            cy.request({
                method: "DELETE",
                url: `https://gorest.co.in/public/v2/users/${id}`,
                headers: {
                    Authorization: this.token,
                },
            }).then((res) => {
                expect(res.status).to.eq(204);
            });
        });
    });

    it("POST /users – błędny token", () => {
        cy.request({
            method: "POST",
            url: "https://gorest.co.in/public/v2/users",
            headers: {
                Authorization: "Bearer FAKE-TOKEN",
            },
            body: {
                name: "Fake",
                email: "fake@mail.com",
                gender: "male",
                status: "active",
            },
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eq(401);
        });
    });

    it("POST /users – walidacja pola email", function () {
        cy.request({
            method: "POST",
            url: "https://gorest.co.in/public/v2/users",
            headers: {
                Authorization: this.token,
            },
            body: {
                name: "No Email",
                gender: "female",
                status: "active",
            },
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eq(422);
            expect(res.body[0]).to.have.property("field", "email");
        });
    });

    it("GET /users?page=2 – paginacja", function () {
        cy.request({
            method: "GET",
            url: "https://gorest.co.in/public/v2/users?page=2",
            headers: {
                Authorization: this.token,
            },
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.be.an("array");
            expect(res.body.length).to.be.greaterThan(0);
        });
    });


});