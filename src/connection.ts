import knex from "knex";

const connection = knex({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_HUSER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA,
    port: 3306,
    multiStatements: true,
  },
});

export default connection;
