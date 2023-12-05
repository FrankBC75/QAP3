// app.js
const express = require("express");
const methodOverride = require("method-override");
const dal = require("./dal"); // Import the DAL module

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

// Routes
app.get("/", async (req, res) => {
  const search = req.query.search || "";
  const people = await dal.getAllPeople();
  res.render("index", { people, search });
});

app.post("/people", async (req, res) => {
  const { first_name, last_name, phone_number } = req.body;

  // Sanitize the phone number
  const sanitizedPhoneNumber = sanitizePhoneNumber(phone_number);

  if (sanitizedPhoneNumber !== null) {
    await dal.createPerson(first_name, last_name, sanitizedPhoneNumber);
    res.redirect("/");
  } else {
    // Handle the case where the phone number is invalid
    res.status(400).send("Invalid phone number format");
  }
});

app.get("/people/:id/edit", async (req, res) => {
  const { id } = req.params;
  const person = await dal.getPersonById(id);
  res.render("edit", { person });
});

app.put("/people/:id", async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, phone_number } = req.body;

  // Sanitize the phone number
  const sanitizedPhoneNumber = sanitizePhoneNumber(phone_number);

  if (sanitizedPhoneNumber !== null) {
    await dal.updatePerson(id, first_name, last_name, sanitizedPhoneNumber);
    res.redirect("/");
  } else {
    // Handle the case where the phone number is invalid
    res.status(400).send("Invalid phone number format");
  }
});

app.delete("/people/:id", async (req, res) => {
  const { id } = req.params;
  await dal.deletePerson(id);
  res.redirect("/");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Sanitize phone number function
function sanitizePhoneNumber(phoneNumber) {
  const numericPhoneNumber = phoneNumber.replace(/[^\d]/g, "");

  if (numericPhoneNumber.length === 10) {
    return `${numericPhoneNumber.slice(0, 3)}-${numericPhoneNumber.slice(
      3,
      6
    )}-${numericPhoneNumber.slice(6)}`;
  }

  return null;
}
