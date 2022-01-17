const db = require("../db/connection");
const {
  formatTopicData,
  formatUserData,
  formatArticleData,
  formatCommentData,
} = require("../utils/seed-formatting");

afterAll(() => db.end());

describe("formatTopicData", () => {
  test("Returns an array", () => {
    const arr = [{ slug: "Slug", description: "Description" }];
    expect(Array.isArray(formatTopicData(arr))).toEqual(true);
  });
  test("Returns the values from the objects as a formatted array", () => {
    const formatArr = [
      { slug: "One", description: "Number one" },
      { slug: "Two", description: "Number two" },
    ];
    expect(formatTopicData(formatArr)).toEqual([
      ["One", "Number one"],
      ["Two", "Number two"],
    ]);
  });
  test("Returns an array that does not mutate", () => {
    const notMutatedArr = [
      { slug: "One", description: "Number one" },
      { slug: "Two", description: "Number two" },
    ];
    formatTopicData(notMutatedArr);
    expect(notMutatedArr).toEqual([
      { slug: "One", description: "Number one" },
      { slug: "Two", description: "Number two" },
    ]);
  });
});

describe("formatUserData", () => {
  test("Returns an array", () => {
    const arr = [
      {
        username: "First_One",
        name: "First",
        avatar_url: "https;//url.com/1",
      },
      {
        username: "Second_One",
        name: "Second",
        avatar_url: "https;//url.com/2",
      },
    ];
    expect(Array.isArray(formatUserData(arr))).toEqual(true);
  });
  test("Returns the values from the objects as a formatted array", () => {
    const formatArr = [
      {
        username: "First_One",
        name: "First",
        avatar_url: "https;//url.com/1",
      },
      {
        username: "Second_One",
        name: "Second",
        avatar_url: "https;//url.com/2",
      },
    ];
    expect(formatUserData(formatArr)).toEqual([
      ["First_One", "https;//url.com/1", "First"],
      ["Second_One", "https;//url.com/2", "Second"],
    ]);
  });
  test("Returns an array that does not mutate", () => {
    const notMutatedArr = [
      {
        username: "First_One",
        name: "First",
        avatar_url: "https;//url.com/1",
      },
      {
        username: "Second_One",
        name: "Second",
        avatar_url: "https;//url.com/2",
      },
    ];
    formatUserData(notMutatedArr);
    expect(notMutatedArr).toEqual([
      {
        username: "First_One",
        name: "First",
        avatar_url: "https;//url.com/1",
      },
      {
        username: "Second_One",
        name: "Second",
        avatar_url: "https;//url.com/2",
      },
    ]);
  });
});

describe("formatArticleData", () => {
  test("Returns an array", () => {
    const arr = [
      {
        title: "First title",
        body: "First body",
        votes: 50,
        topic: "First topic",
        author: "First author",
        created_at: "Tue Nov 03 2020 09:12:00 ",
      },
      {
        title: "Second title",
        body: "Second body",
        votes: 100,
        topic: "Second topic",
        author: "Second author",
        created_at: "Tue Nov 03 2020 09:12:00 ",
      },
    ];
    expect(Array.isArray(formatArticleData(arr))).toEqual(true);
  });
  test("Returns the values from the objects as a formatted array", () => {
    const formatArr = [
      {
        title: "First title",
        body: "First body",
        votes: 50,
        topic: "First topic",
        author: "First author",
        created_at: "Tue Nov 03 2020 09:12:00 ",
      },
      {
        title: "Second title",
        body: "Second body",
        votes: 100,
        topic: "Second topic",
        author: "Second author",
        created_at: "Tue Nov 03 2020 09:12:00 ",
      },
    ];
    expect(formatArticleData(formatArr)).toEqual([
      [
        "First title",
        "First body",
        50,
        "First topic",
        "First author",
        "Tue Nov 03 2020 09:12:00 ",
      ],
      [
        "Second title",
        "Second body",
        100,
        "Second topic",
        "Second author",
        "Tue Nov 03 2020 09:12:00 ",
      ],
    ]);
  });
  test("Returns an array that does not mutate", () => {
    const notMutatedArr = [
      {
        title: "First title",
        body: "First body",
        votes: 50,
        topic: "First topic",
        author: "First author",
        created_at: "Tue Nov 03 2020 09:12:00 ",
      },
      {
        title: "Second title",
        body: "Second body",
        votes: 100,
        topic: "Second topic",
        author: "Second author",
        created_at: "Tue Nov 03 2020 09:12:00 ",
      },
    ];
    formatArticleData(notMutatedArr);
    expect(notMutatedArr).toEqual([
      {
        title: "First title",
        body: "First body",
        votes: 50,
        topic: "First topic",
        author: "First author",
        created_at: "Tue Nov 03 2020 09:12:00 ",
      },
      {
        title: "Second title",
        body: "Second body",
        votes: 100,
        topic: "Second topic",
        author: "Second author",
        created_at: "Tue Nov 03 2020 09:12:00 ",
      },
    ]);
  });
});

describe("formatCommentData", () => {
  test("Returns an array", () => {
    const arr = [
      {
        author: "First author",
        article_id: 1,
        votes: 50,
        created_at: "Tue Nov 03 2020 09:12:00 ",
        body: "First body",
      },
      {
        author: "Second author",
        article_id: 2,
        votes: 100,
        created_at: "Tue Nov 03 2020 09:12:00 ",
        body: "Second body",
      },
    ];
    expect(Array.isArray(formatCommentData(arr))).toEqual(true);
  });
  test("Returns the values from the objects as a formatted array", () => {
    const formatArr = [
      {
        author: "First author",
        article_id: 1,
        votes: 50,
        created_at: "Tue Nov 03 2020 09:12:00 ",
        body: "First body",
      },
      {
        author: "Second author",
        article_id: 2,
        votes: 100,
        created_at: "Tue Nov 03 2020 09:12:00 ",
        body: "Second body",
      },
    ];
    expect(formatCommentData(formatArr)).toEqual([
      ["First author", 1, 50, "Tue Nov 03 2020 09:12:00 ", "First body"],
      ["Second author", 2, 100, "Tue Nov 03 2020 09:12:00 ", "Second body"],
    ]);
  });
  test("Returns an array that does not mutate", () => {
    const notMutatedArr = [
      {
        author: "First author",
        article_id: 1,
        votes: 50,
        created_at: "Tue Nov 03 2020 09:12:00 ",
        body: "First body",
      },
      {
        author: "Second author",
        article_id: 2,
        votes: 100,
        created_at: "Tue Nov 03 2020 09:12:00 ",
        body: "Second body",
      },
    ];
    formatCommentData(notMutatedArr);
    expect(notMutatedArr).toEqual([
      {
        author: "First author",
        article_id: 1,
        votes: 50,
        created_at: "Tue Nov 03 2020 09:12:00 ",
        body: "First body",
      },
      {
        author: "Second author",
        article_id: 2,
        votes: 100,
        created_at: "Tue Nov 03 2020 09:12:00 ",
        body: "Second body",
      },
    ]);
  });
});
