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

    it("PUT /users/:id – should update user data", function () {
        cy.request({
            method: "PUT",
            url: `https://gorest.co.in/public/v2/users/${this.userId}`,
            headers: {
                Authorization: this.token,
            },
            body: {
                name: "Updated QA Tester",
            },
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.name).to.eq("Updated QA Tester");
        });
    });

    it("DELETE /users/:id – should delete the user", function () {
        cy.request({
            method: "DELETE",
            url: `https://gorest.co.in/public/v2/users/${this.userId}`,
            headers: {
                Authorization: this.token,
            },
        }).then((res) => {
            expect(res.status).to.eq(204);
        });
    });

    it("POST /users – should return 401 with invalid token", () => {
        cy.request({
            method: "POST",
            url: "https://gorest.co.in/public/v2/users",
            headers: {
                Authorization: "Bearer FAKE-TOKEN",
            },
            body: {
                name: "Invalid",
                email: "invalid@mail.com",
                gender: "male",
                status: "active",
            },
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eq(401);
        });
    });

    it("POST /users – should return validation error for missing email", function () {
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

    it("GET /users?page=2 – should return paginated users", function () {
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