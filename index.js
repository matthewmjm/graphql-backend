const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const uri =
	"mongodb+srv://matthewmjm_prod:<password>@cluster0.aedqk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const app = express();
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`listening on port ${port}`));
