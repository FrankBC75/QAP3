// dal.js
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "people",
  password: "saltybastard75",
  port: 5432,
});

const getAllPeople = async () => {
  const { rows } = await pool.query("SELECT * FROM people");
  return rows;
};
const getPersonByName = async (firstName, lastName) => {
  const { rows } = await pool.query(
    "SELECT * FROM people WHERE first_name = $1 AND last_name = $2",
    [firstName, lastName]
  );
  return rows[0];
};
const getPersonById = async (id) => {
  const { rows } = await pool.query(
    "SELECT * FROM people WHERE person_id = $1",
    [id]
  );
  return rows[0];
};

const createPerson = async (first_name, last_name, phone_number) => {
  await pool.query(
    "INSERT INTO people (first_name, last_name, phone_number) VALUES ($1, $2, $3)",
    [first_name, last_name, phone_number]
  );
};

const updatePerson = async (id, first_name, last_name, phone_number) => {
  await pool.query(
    "UPDATE people SET first_name = $1, last_name = $2, phone_number = $3 WHERE person_id = $4",
    [first_name, last_name, phone_number, id]
  );
};

const deletePerson = async (id) => {
  await pool.query("DELETE FROM people WHERE person_id = $1", [id]);
};

module.exports = {
  getAllPeople,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson,
};
