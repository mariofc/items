const supertest = require("supertest");
const { app, server } = require("../src/index");

const api = supertest(app);

beforeAll(() => jest.setTimeout(20000));

describe('Search items by query', () => {
    describe('Success cases', () => {
        test('Searching validate response status and content', async () => {
            await api
            .get('/api/items/')
            .expect(200)
            .expect('Content-Type', /application\/json/);
        });

        test('Searching items by text and limit 2', async () => {
            const query = 'cama';
            const limit = 2;

            const response = await api
            .get('/api/items/')
            .query({ q: query, limit });

            const content = response.body.items.map( item => item.title.toLowerCase());

            content.forEach(element => {
                expect(element).toContain(query);
            });

            expect(content.length).toBe(limit);
        });

        test('Searching items without results', async () => {
            const query = 'some-word-very-weird';

            const response = await api
            .get('/api/items/')
            .query({ q: query });

            expect(response.body.items.length).toBe(0);
        });

        test('Searching items with empty query', async () => {
            const query = '';

            const response = await api
            .get('/api/items/')
            .query({ q: query });

            expect(response.body.items.length).toBe(0);
        });
    });
});

describe('Search item by id', () => {
    describe('Success cases', () => {
        test('Searching items by id', async () => {
            const id = 'MLA816919801';

            await api
            .get(`/api/items/${id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        });

        test('Searching items getting its description', async () => {
            const id = 'MLA816919801';

            const response = await api
            .get(`/api/items/${id}`);

            expect(response.body.item).toHaveProperty('description');
        });
    });

    describe('Failiure cases', () => {
        test('Searching items by nonexistent id', async () => {
            const id = 'MLA99999999999';

            await api
            .get(`/api/items/${id}`)
            .expect(404)
            .expect('Content-Type', /application\/json/);
        });
    });
});


afterAll( () => {
    server.close();
});