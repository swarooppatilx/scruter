import prismadb from "../lib/prismadb";
import { Category } from "@prisma/client";


async function main() {

  const seller = await prismadb.seller.create({
    data: {
      name: "Demo Seller",
      email: "demo.seller@example.com",
    //   otp: null
    },
  });



interface ListingArray{
    name:string,
    price:number,
    description:string,
    category:Category
    images:string[]
}
  const listings:ListingArray[] = [
    {
      name: "Cozy 2-Bedroom Apartment",
      price: 120000,
      description: "A beautiful 2-bedroom apartment in the city center.",
      category: "Housing",
      images: ["/seed/house1a.webp","/seed/house1b.webp"], // Replace with actual image path
    },
    {
      name: "Modern Family House",
      price: 250000,
      description: "Spacious house with garden, perfect for families.",
      category: "Housing",
      images: ["/seed/house2a.webp","/seed/house2b.webp"], // Replace with actual image path
    },
    {
      name: "Classic Margherita Pizza",
      price: 15,
      description: "A delicious classic Margherita pizza.",
      category: "Fooding",
      images: ["/seed/food1a.jpeg","/seed/food1b.jpeg"], // Replace with actual image path
    },
    {
      name: "Cheeseburger with Fries",
      price: 10,
      description: "Juicy cheeseburger with crispy fries.",
      category: "Fooding",
      images: ["/seed/food2a.jpg","/seed/food2b.avif"], // Replace with actual image path
    },
    {
      name: "Suzuki Alto",
      price: 3000,
      description: "Compact and fuel-efficient car, perfect for city drives.",
      category: "For_Sale",
      images: ["/seed/forsale1a.jpeg","/seed/forsale1b.jpeg"], // Replace with actual image path
    },
    {
      name: "Royal Enfield Shotgun",
      price: 6000,
      description: "A powerful bike for long-distance rides.",
      category: "For_Sale",
      images: ["/seed/forsale2a.jpeg","/seed/forsale2b.jpeg"], // Replace with actual image path
    },
  ];

  // Step 3: Loop through each listing, upload images, and create listing entries
  for (const listing of listings) {
    // Upload images to Cloudinary and get URLs
    const imageUrls = listing.images.map(imagePath => ({ url: imagePath }));

    // Create listing in the database
    await prismadb.listing.create({
      data: {
        SellerId: seller.id,
        name: listing.name,
        price: listing.price,
        description: listing.description,
        category: listing.category,
        images: {
          create: imageUrls,
        },
      },
    });
  }

  console.log("Database seeded successfully with seller and listings.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismadb.$disconnect();
  });
