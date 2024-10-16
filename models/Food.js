const foodSchema = new mongoose.Schema({
  title: String,
  image: String,
  location: String,
  latitude: String,
  longitude: String,
  description: String,
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});
const Food = mongoose.model("Food", foodSchema);
