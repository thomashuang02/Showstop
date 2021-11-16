const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../src/app");
chai.use(chaiHttp);
const agent = chai.request.agent(app);
const assert = require('assert');
const faker = require('faker');

const listRoutesExports = require('../src/routes/listRoutes');
const [commaSeparatedToArray, formatEntry] = [listRoutesExports.commaSeparatedToArray, listRoutesExports.formatEntry];

describe('List operations API', () => {
    //helper function unit tests
    describe("Helper function unit tests", () => {
        it("commaSeparatedToArray() should format all comma-separated strings into nonempty array elements", () => {
            expect(commaSeparatedToArray("")).to.eql([]);
            expect(commaSeparatedToArray("hello")).to.eql(["hello"]);
            expect(commaSeparatedToArray(",,,hello,,,")).to.eql(["hello"]);
            expect(commaSeparatedToArray("hello,goodbye,")).to.eql(["hello","goodbye"]);
            expect(commaSeparatedToArray(",hello,    goodbye   ")).to.eql(["hello","goodbye"]);
            expect(commaSeparatedToArray("abc12, 3#$%, 汉字")).to.eql(["abc12","3#$%","汉字"]);
        });
        it("formatEntry() should array-ify genres/tags, add/update date added, and preserve all other properties", () => {
            const entry = {
                title: faker.name.title(),
                rating: faker.datatype.number(),
                status: faker.lorem.word(),
                episodesCompleted: faker.datatype.number(),
                episodesTotal: faker.datatype.number(),
                favorite: faker.datatype.boolean(),
                type: faker.lorem.word(),
                genres: (faker.lorem.word()+",").repeat(2),
                tags: (faker.lorem.word()+",").repeat(6),
                notes: faker.lorem.sentence()
            }
            const formattedEntry = formatEntry(entry);
            assert.equal(formattedEntry.title, entry.title);
            assert.equal(formattedEntry.rating, entry.rating);
            assert.equal(formattedEntry.status, entry.status);
            assert.equal(formattedEntry.episodesCompleted, entry.episodesCompleted);
            assert.equal(formattedEntry.episodesTotal, entry.episodesTotal);
            assert.equal(formattedEntry.favorite, entry.favorite);
            assert.equal(formattedEntry.type, entry.type);
            chai.assert.typeOf(formattedEntry.genres, 'array');
            chai.assert.typeOf(formattedEntry.tags, 'array');
            assert.equal(formattedEntry.notes, entry.notes);
            formattedEntry.should.include.keys("dateAdded");
        });
    });

    //test get list route
    describe("Unsure of how to write integration tests with chai-http that can access req.session...", () => {
        it("on which all my list operations depend.", () => {
            expect(1).to.equal(1);
        });
    });
});