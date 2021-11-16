const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../src/app");
chai.use(chaiHttp);
const agent = chai.request.agent(app);
chai.should();

//random username generator
function generateName(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   return result;
}

describe('Authentication API', () => {
    //test post login route
    describe("POST /api/login", () => {
        it("Route should exist and respond with status 200 OK", (done) => {
            chai.request(app)
                .post("/api/login")
                .end((err, response) => {
                    if (err) throw err;
                    response.should.have.status(200);
                    done();
                });
        });
        it("Should return 'true' in response if sent valid credentials", (done) => {
            chai.request(app)
                .post("/api/login")
                .send({ username: "demo", password: "demodemo" })
                .end((err, response) => {
                    if (err) throw err;
                    expect(response.res.text).to.equal("true");
                    done();
                });
        });
        it("Should return 'false' in response if sent invalid credentials", (done) => {
            chai.request(app)
                .post("/api/login")
                .send({ username: "demo", password: "wrongpassword" })
                .end((err, response) => {
                    if (err) throw err;
                    expect(response.res.text).to.equal("false");
                });
            chai.request(app)
                .post("/api/login")
                .send({ username: "wrongusername", password: "demodemo" })
                .end((err, response) => {
                    if (err) throw err;
                    expect(response.res.text).to.equal("false");
                });
            chai.request(app)
                .post("/api/login")
                .send({ username: "wrongusername", password: "wrongpassword" })
                .end((err, response) => {
                    if (err) throw err;
                    expect(response.res.text).to.equal("false");
                    done();
                });
        });
    });

    //test post register route
    describe("POST /api/register", () => {
        it("Route should exist and respond with status 200 OK", (done) => {
            chai.request(app)
                .post("/api/register")
                .end((err, response) => {
                    if (err) throw err;
                    response.should.have.status(200);
                    done();
                });
        });
        it("Should return 'true' in response if username is available", (done) => {
            chai.request(app)
                .post("/api/register")
                .send({ username: generateName(16), password: "fillerpassword" })
                .end((err, response) => {
                    if (err) throw err;
                    expect(response.res.text).to.equal("true");
                    done();
                });
        });
        it("Should return 'false' in response if attempting to register existing username", (done) => {
            chai.request(app)
                .post("/api/register")
                .send({ username: "demo", password: "demodemo" })
                .end((err, response) => {
                    if (err) throw err;
                    expect(response.res.text).to.equal("false");
                })
            chai.request(app)
                .post("/api/register")
                .send({ username: "demo", password: "fillerpassword" })
                .end((err, response) => {
                    if (err) throw err;
                    expect(response.res.text).to.equal("false");
                    done();
                });
        });
    });

    //test get user route
    describe("GET /api/user and GET /api/logout", () => {
        it("Route should exist and respond with status 200 OK", (done) => {
            chai.request(app)
                .get("/api/user")
                .end((err, response) => {
                    if (err) throw err;
                    response.should.have.status(200);
                    done();
                });
        });
        it("If there is a session, /user should respond with well-formatted user data JSON", (done) => {
            agent
                .post("/api/login")
                .send({ username: "demo", password: "demodemo" })
                .then(() => {
                    agent.get("/api/user")
                        .then( response => {
                            response.should.have.status(200);
                            response.should.to.be.json;
                            response.body.should.include.keys([
                                '_id','username','password','list'
                            ]);
                            expect(response.body.list).to.be.an('array');
                            //if any entries, make sure they're well-formatted too
                            if(response.body.list.length > 0) {
                                response.body.list[0].should.include.keys([
                                    'title','rating','status','episodesCompleted','episodesTotal','favorite','type','genres','tags','notes','dateAdded','_id'
                                ]);   
                            }
                            done();
                        });
                });
        });
        it("Logout should remove the current session and /user should respond with empty object", (done) => {
            agent
                .get("/api/logout")
                .then(() => {
                    agent.get("/api/user")
                        .then( response => {
                            response.should.have.status(200);
                            expect(response.body).to.be.empty;
                            done();
                        });
                });
        });
    });
});