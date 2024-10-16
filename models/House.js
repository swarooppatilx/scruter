const houseSchema = new mongoose.Schema({
  title: String,
  image: String,
  location: String,
  rent: Number,
  latitude: String,
  longitude: String,
  description: String,
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});
const House = mongoose.model("House", houseSchema);
