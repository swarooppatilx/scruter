'use client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Bookmark, Mail, User } from 'lucide-react';

export default function UserProfile() {
  return (
    <div className="flex flex-col items-center py-8 px-4 md:px-10 lg:px-20">
      {/* User Info Section */}
      <Card className="w-full max-w-xl p-6 mb-8 shadow-md border border-gray-200 rounded-md">
        <CardHeader className="flex items-center">
          <User className="h-10 w-10 text-gray-500 mr-4" />
          <div>
            <CardTitle className="text-xl font-semibold">
              {/* {user.name} */}
              afeeeee
            </CardTitle>
            <p className="text-gray-600 flex items-center">
              <Mail className="h-5 w-5 text-gray-500 mr-2" />
              {/* {user.email} */}feaaaaaaaa
            </p>
          </div>
        </CardHeader>
      </Card>

      {/* Bookmarked Listings Section */}
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Bookmark className="h-6 w-6 text-gray-600 mr-2" />
          Bookmarked Listings
        </h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* {bookmarks.map(listing => ( */}
            <Card
            //   key={listing.id}
              className="shadow-md border border-gray-200 rounded-md"
            >
              <CardHeader className="p-3">
                <CardTitle className="text-lg font-semibold">
                  {/* {listing.title} */}
                  aadw
                </CardTitle>
                <p className="text-sm text-gray-600 truncate">
                  {/* {listing.description} */}
                  awdawd
                </p>
              </CardHeader>
              <CardContent className="p-3">
                {/* <img
                  src={listing.thumbnail}
                  alt={listing.title}
                  className="h-32 w-full object-cover rounded-md mb-2"
                /> */}
                <img
                  src='/food1a.jpg'
                  className="h-32 w-full object-cover rounded-md mb-2"
                />
                <p className="text-gray-700 font-bold">
                    {/* ${listing.price} */}
                    $33

                </p>
              </CardContent>
            </Card>
          {/* ))} */}
        </div>
        {/* {bookmarks.length === 0 && ( */}
          <p className="text-center text-gray-500 mt-4">No bookmarks yet.</p>
        {/* )} */}
      </div>
    </div>
  );
}
