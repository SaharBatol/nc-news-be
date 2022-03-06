# **NorthCoders News API**

# **Built By Sahar Batol**

---

## **Back-End**

- Back-end - Hosted link: https://sahar-news.herokuapp.com/api

## **Front-End**

- Front-End - Hosted link: https://sahar-nc-news.netlify.app/
- Front-End - Github link: https://github.com/SaharBatol/nc-news

---

## **Description**

'News API' is an API built using Node.js, Express.js and a PostgreSQL database.

You can view the API endpoints in the `endpoints.json` file or by going to https://sahar-news.herokuapp.com/api

---

# **Setup / Installation Instructions**

### **requirements:**

- Node.js 17.x
- Postgres 14.x

### **Application dependencies:**

<i>
  
- npm 8.x
- cors: 2.x
- dotenv 14.x
- express 4.x
- pg 8.x
- pg-format 1.x
  </i>

### **Developer only dependencies:**

<i>

- jest 27.x
- jest-extended: 1.x
- jest-sorted 1.x
- supertest 6.x
  </i>

### **Cloning the repositry:**

- In your terminal:

```
$ git clone https://github.com/SaharBatol/nc-news.git
$ cd nc-news
```

### **Installing dependencies:**

- Initialising Node by installing the required dependencies from `package.json`. In your terminal:

```
$ npm install
```

### **Environment setup:**

- You will need to create _two_ `.env` files: `.env.test` and `.env.development`. Into each, add `PGDATABASE = nc_news` for the `.env.development` file and `PGDATABASE = nc_news_test` for the `.env.test` file.

### **Database set-up and seeding:**

- To begin testing or using this app, you will need to setup the database seed it with data:

```
$ npm run setup-dbs
$ npm run seed
```

# **Testing**

- `Jest` is the framework used to test this application.
- To run tests:

```
$ npm test
```
