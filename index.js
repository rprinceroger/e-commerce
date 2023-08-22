// [Module and Dependencies]
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require("./routes/user")
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order")

//[Environment Setup]
const port = 4000;

//[Server Setup]
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

//[Database Connection]
mongoose.connect("mongodb+srv://admin:admin123@batch297.wrxktxt.mongodb.net/capstone2?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
)

//[Connection Prompt Status]
let db = mongoose.connection;
db.on('error', console.error.bind(console,'Connection error'));
db.once('open', () => console.log('Connected to database.'));


//[Backend Routes]
app.use("/users",userRoutes);
app.use("/products",productRoutes);
app.use("/orders",orderRoutes);


if(require.main === module){
	app.listen(process.env.PORT || port, ()=>{
		console.log(`API is now online on port ${process.env.PORT || port}`)
	})
}

module.exports = {app,mongoose};
