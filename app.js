const { render } = require("ejs");
const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.set("views",path.resolve(__dirname,"views"));
app.set("view engine","ejs");

const databaseUrl = "mongodb+srv://swarooppatil850:strongpass1234@cluster0.hdp22av.mongodb.net/?appName=Cluster0";

//Mongo DB
   
mongoose.connect(databaseUrl);

// Step 3: Create a Mongoose model for your posts
const foodSchema = new mongoose.Schema({
  title: String,
  image: String,
  location: String,
  description: String
});
const Food = mongoose.model('Food', foodSchema);

const houseSchema = new mongoose.Schema({
  title: String,
  image: String,
  location: String,
  description: String
});
const House = mongoose.model('House', houseSchema);

const marketSchema = new mongoose.Schema({
  title: String,
  image: String,
  location: String,
  description: String
});
const Market = mongoose.model('Market', marketSchema);



//End Mongo DB

//Multer File upload

// Set up Multer storage and upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Use a unique filename
  },
});

const upload = multer({ storage: storage });
//End multer

app.get('/',(req,res)=>{
    res.render('index');
});
app.get('/food',(req,res)=>{
  res.render('food_index');
});

app.get('/house',(req,res)=>{
  res.render('house_index');
});
app.get('/house/find', async (req, res) => {
  //All
   try {
     // Fetch data from MongoDB
     const cards = await House.find();
 
     // Render the view with the fetched data
     res.render('house_find', {cards});
   } catch (error) {
     console.error('Error fetching posts:', error);
     res.status(500).send('Internal Server Error');
   }
 
 });
app.get('/house/share',(req,res)=>{
  res.render('house_share');
});

app.post('/house/share',upload.single('image'), (req,res)=>{
 
  // Save the file path to MongoDB
  const imagePath = 'uploads/' + req.file.filename; // Adjust the path accordingly

// Step 4: Use the model to create and save a new post
req.body.image = imagePath;
const newHouse = new House(req.body);

newHouse.save()
.then((savedHouse) => {
  res.redirect('/house/find');
  console.log('House saved:', savedHouse, "Img path", imagePath);
})
.catch((error) => {
  console.error('Error saving House:', error);
});

});



app.get('/market',(req,res)=>{
  res.render('market_index');
});
app.get('/market/buy', async (req, res) => {
  //All
   try {
     // Fetch data from MongoDB
     const cards = await Market.find();
 
     // Render the view with the fetched data
     res.render('market_buy', {cards});
   } catch (error) {
     console.error('Error fetching posts:', error);
     res.status(500).send('Internal Server Error');
   }
 
 });
app.get('/market/sell',(req,res)=>{
  res.render('market_sell');
});

app.post('/market/sell',upload.single('image'), (req,res)=>{
 
  // Save the file path to MongoDB
  const imagePath = 'uploads/' + req.file.filename; // Adjust the path accordingly

// Step 4: Use the model to create and save a new post
req.body.image = imagePath;
const newMarket = new Market(req.body);

newMarket.save()
.then((savedMarket) => {
  res.redirect('/market/buy');
  console.log('Market saved:', savedMarket, "Img path", imagePath);
})
.catch((error) => {
  console.error('Error saving food:', error);
});

});



app.get('/food/find', async (req, res) => {
 //All
  try {
    // Fetch data from MongoDB
    const cards = await Food.find();

    // Render the view with the fetched data
    res.render('food_find', {cards});
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Internal Server Error');
  }

});

app.get('/food/share',(req,res)=>{
    res.render('food_share');
});
app.post('/food/share',upload.single('image'), (req,res)=>{
 
    // Save the file path to MongoDB
    const imagePath = 'uploads/' + req.file.filename; // Adjust the path accordingly
 
// Step 4: Use the model to create and save a new post
req.body.image = imagePath;
const newFood = new Food(req.body);

newFood.save()
  .then((savedFood) => {
    res.redirect('/food/find');
    console.log('Food saved:', savedFood, "Img path", imagePath);
  })
  .catch((error) => {
    console.error('Error saving food:', error);
  });

});
app.get('/food/farmers',(req,res)=>{
    res.render('food_farmers');
});

app.use((req,res)=>{
    res.status(404).send("Oops! The requested page was not found")
});
app.listen(8080, ()=>{
    console.log('Server listening on port 8080...')
});