const request = require("supertest");
const db = require("../db/connection.js");
const app = require("../app");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/api/topics", () => {
  describe("GET", () => {
    test("Returns status code of 200", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((res) => {
          expect(typeof res.body).toBe("object");
          expect(res.body).hasOwnProperty("topics");
          if (res.body.length !== 0) {
            res.body.topics.forEach((topic) => {
              expect(topic).toMatchObject({
                slug: expect.any(String),
                description: expect.any(String),
              });
            });
          } else {
            fail("Error, test failed: body empty");
          }
        });
    });
  });
});

describe("/api/articles/:article_id", () => {
  describe("GET", () => {
    test("Returns status code of 200", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then((res) => {
          expect(typeof res.body).toBe("object");
          expect(res.body.article).toEqual({
            article_id: 1,
            title: "Living in the shadow of a great man",
            body: "I find this existence challenging",
            votes: 100,
            author: "butter_bridge",
            topic: "mitch",
            created_at: "2020-07-09T20:11:00.000Z",
            comment_count: "11",
          });
        });
    });
    test("Return status code 404 if article_id is valid but not found", () => {
      return request(app)
        .get("/api/articles/300000")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not found");
        });
    });

    test("Return status code 400 if article_id is invalid", () => {
      return request(app)
        .get("/api/articles/a")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
  });

  describe("PATCH", () => {
    test("Return status code 201, increment votes by 10 and returns an object", () => {
      const increaseVotes = { inc_votes: 10 };
      return request(app)
        .patch("/api/articles/1")
        .send(increaseVotes)
        .expect(201)
        .then(({ body }) => {
          expect(typeof body).toBe("object");
          expect(body.result).toEqual({
            article_id: 1,
            title: "Living in the shadow of a great man",
            body: "I find this existence challenging",
            votes: 110,
            author: "butter_bridge",
            topic: "mitch",
            created_at: "2020-07-09T20:11:00.000Z",
          });
        });
    });
  });
  test("Return status code 201, decrement votes by 10 and returns an object", () => {
    const decreaseVotes = { inc_votes: -10 };
    return request(app)
      .patch("/api/articles/1")
      .send(decreaseVotes)
      .expect(201)
      .then(({ body }) => {
        expect(typeof body).toBe("object");
        expect(body.result).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          body: "I find this existence challenging",
          votes: 90,
          author: "butter_bridge",
          topic: "mitch",
          created_at: "2020-07-09T20:11:00.000Z",
        });
      });
  });
  test("Return status code 404 if article_id is valid but not found", () => {
    const decreaseVotes = { inc_votes: -10 };
    return request(app)
      .patch("/api/articles/300000")
      .send(decreaseVotes)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });

  test("Return status code 400 if article_id is invalid", () => {
    const decreaseVotes = { inc_votes: -10 };
    return request(app)
      .patch("/api/articles/a")
      .send(decreaseVotes)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

describe("/api/articles", () => {
  describe("GET", () => {
    test("Return status 200 and array of objects for each article", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(typeof body).toBe("object");
          body.articles.forEach((article) => {
            expect(article).toMatchObject({
              article_id: expect.any(Number),
              title: expect.any(String),
              body: expect.any(String),
              votes: expect.any(Number),
              author: expect.any(String),
              topic: expect.any(String),
              created_at: expect.any(String),
              comment_count: expect.any(String),
            });
          });
        });
    });
  });
  test("Return status code 200 and is sorted by date as default", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });

  test("Return status code 200 and is sorted by article_id", () => {
    return request(app)
      .get("/api/articles?sort_by=article_id")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeSortedBy("article_id", {
          descending: true,
        });
      });
  });

  test("Return status code 200 and is ordered by desc as default", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeSorted({ descending: true });
      });
  });

  test("Return status code 200 and is ordered by asc", () => {
    return request(app)
      .get("/api/articles?order_by=ASC")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeSorted({ ascending: true });
      });
  });

  test("Return status code 200 and display topics of cats", () => {
    return request(app)
      .get("/api/articles?topic=cats")
      .expect(200)
      .then(({ body }) => {
        body.articles.forEach((article) => {
          expect(article.topic).toBe("cats");
        });
      });
  });

  test("Return status code 400 when provided wrong order_by url", () => {
    return request(app)
      .get("/api/articles?order_by=wrong")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });

  test("Return status code 400 when provided wrong sort_by url", () => {
    return request(app)
      .get("/api/articles?sort_by=colummn")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });

  test("Return status code 400 when provided wrong topic", () => {
    return request(app)
      .get("/api/articles?topic=newtopic")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
});
