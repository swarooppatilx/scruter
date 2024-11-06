'use server';
import prismadb from '@/lib/prismadb';
import { Category, Image, Listing } from '@prisma/client';

export interface ListingWithImages extends Listing {
  images: Image[];
}

export async function PostListing({
  sellerId,
  listingData,
}: {
  sellerId: string;
  listingData: Pick<Listing, 'name' | 'price' | 'description' | 'category'> & {
    images: string[];
  };
}): Promise<{ success: boolean; error?: string; data?: Listing }> {
  // console.log(listingData);

  if (
    !listingData.name ||
    !listingData.category ||
    !listingData.description ||
    !listingData.price ||
    !listingData.images || // Check for images array
    listingData.images.length === 0 // Ensure images array is not empty
  ) {
    return { success: false, error: 'All entries are required!' };
  }

  try {
    const resp = await prismadb.listing.create({
      data: {
        SellerId: sellerId,
        ...listingData,
        images: {
          create: listingData.images.map(url => ({ url })), // Assuming you're passing URLs
        },
      },
    });
    return { success: true, data: resp };
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, error: err.message }; // Access the message property safely
    }
    return { success: false, error: 'An unknown error occurred' }; // Fallback for unexpected types
  }
}

export async function UpdateListing({
  sellerId,
  listingId,
  listingData,
}: {
  sellerId: string;
  listingId: string;
  listingData: Pick<Listing, 'name' | 'price' | 'description' | 'category'> & {
    images: string[];
  };
}): Promise<{ success: boolean; error?: string; data?: Listing }> {
  if (
    !listingData.name ||
    !listingData.category ||
    !listingData.description ||
    !listingData.price ||
    !listingData.images || // Check for images array
    listingData.images.length === 0 // Ensure images array is not empty
  ) {
    return { success: false, error: 'All entries are required!' };
  }

  // checking listing by seller so that no seller can update a listing which is not assigned to them

  try {
    await prismadb.seller.findUnique({
      where: {
        id: sellerId,
      },
      select: {
        Listings: {
          where: {
            id: listingId,
          },
        },
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, error: err.message }; // Access the message property safely
    }
    return {
      success: false,
      error: 'An unknown error occurred during fetching listing by seller',
    };
  }

  try {
    await prismadb.listing.update({
      where: {
        id: listingId,
      },
      data: {
        ...listingData,
        images:{
          deleteMany:{}
        }
      },
    });
    const resp = await prismadb.listing.update({
      where: {
        id: listingId,
      },
      data: {
        images:{
          createMany:{
            data: listingData.images.map((imageUrl) => ({
              url: imageUrl, // Correctly map each URL to an object with a `url` property
            })),
          }
        }
      },
    });
    return { success: true, data: resp };
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, error: err.message }; // Access the message property safely
    }
    return {
      success: false,
      error: 'An unknown error occurred during updating listing by seller',
    };
  }
}

export async function DeleteListing({
  sellerId,
  listingId,
}: {
  sellerId: string;
  listingId: string;
}): Promise<{ success: boolean; error?: string; data?: Listing }> {
  // checking listing by seller so that no seller can update a listing which is not assigned to them

  try {
    await prismadb.seller.findUnique({
      where: {
        id: sellerId,
      },
      select: {
        Listings: {
          where: {
            id: listingId,
          },
        },
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, error: err.message }; // Access the message property safely
    }
    return {
      success: false,
      error: 'An unknown error occurred during fetching listing by seller',
    };
  }

  // actual deleting
  try {
    const resp = await prismadb.listing.delete({
      where: {
        id: listingId,
      },
    });

    return { success: true, data: resp };
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, error: err.message }; // Access the message property safely
    }
    return {
      success: false,
      error: 'An unknown error occurred during deleting the listing',
    };
  }
}


export async function GetAllListing(
  category?: Category, 
  searchQuery?: string, 
  sort?: "" | "asc" | "desc" | undefined
): Promise<{
  success: boolean;
  error?: string;
  data?: ListingWithImages[];
}> {
  // Set no-cache headers to ensure fresh data
  const headers = new Headers();
  headers.append('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  headers.append('Pragma', 'no-cache');
  headers.append('Expires', '0');
  
  // Build the where clause based on provided parameters
  let whereClause = {};
  
  if (category) {
    whereClause = { ...whereClause, category };
  }

  if (searchQuery) {
    whereClause = {
      ...whereClause,
      OR: [
        { name: { contains: searchQuery, mode: 'insensitive' } },
        { description: { contains: searchQuery, mode: 'insensitive' } },
      ],
    };
  }

  try {
    // Query the database for listings with optional filters and sorting
    const resp: ListingWithImages[] = await prismadb.listing.findMany({
      where: whereClause,
      include: {
        images: true,
      },
      orderBy: sort ? { price: sort } : undefined, // Sort by price if 'sort' is provided
    });

    if (!resp) {
      return { success: false, error: 'Error occurred in fetching all listings' };
    }

    return { success: true, data: resp };
  } catch (error: unknown) {
    // Narrowing the error type to handle it properly
    if (error instanceof Error) {
      return { success: false, error: error.message || 'An error occurred' };
    } else {
      return { success: false, error: 'An unknown error occurred' };
    }
  }
}


export async function getSpecificListing({
  listingId,
}: {
  listingId: string;
}): Promise<{ success: boolean; error?: string; data?: ListingWithImages }> {
  // console.log(listingId);

  try {
    const resp = await prismadb.listing.findUnique({
      where: {
        id: listingId,
      },
      include:{
        images:true
      }
    });

    if (!resp) {
      return { success: false, error: 'Error fetching this specific listing' };
    }
    return { success: true, data: resp };
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, error: err.message }; // Access the message property safely
    }
    return {
      success: false,
      error: 'An unknown error occurred during fetching specific listing',
    };
  }
}

// get is featured listings route is pending, will implement after feature approval from PA
