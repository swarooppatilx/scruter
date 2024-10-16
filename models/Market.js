const marketSchema = new mongoose.Schema({
  title: String,
  image: String,
  location: String,
  price: Number,
  latitude: String,
  longitude: String,
  description: String,
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});
const Market = mongoose.model("Market", marketSchema);
