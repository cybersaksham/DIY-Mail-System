const express = require("express");
const cors = require("cors");

// Creating App
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

// Listening
app.listen(port, () => {
  console.log(`Mail System Backend is listening at http://localhost:${port}`);
});
