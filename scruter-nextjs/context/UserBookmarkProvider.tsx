"use client";

import { createBookmark } from "@/actions/user/bookmarks/CREATE_bookmark";
import { deleteBookmark } from "@/actions/user/bookmarks/DELETE_bookmark";
import { checkBookmarkExists } from "@/actions/user/bookmarks/EXISTS_bookmark";
import { BookmarkWithListing, getBookmarksByUser } from "@/actions/user/bookmarks/GETBYUSER_bookmark";
import React, { createContext, useContext, useState, useEffect } from "react";



type BookmarkContextType = {
  bookmarks: BookmarkWithListing[];
  loading: boolean;
  error: string | null;
  fetchBookmarks: (userId: string) => Promise<void>;
  addToBookmarks: (userId: string, listingId: string) => Promise<void>;
  removeFromBookmarks: (userId: string, listingId: string) => Promise<void>;
  isBookmarked: (userId: string, listingId: string) => Promise<boolean>;
};

// Create context with an initial value of null
const BookmarkContext = createContext<BookmarkContextType | null>(null);

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<BookmarkWithListing[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all bookmarks for a specific user
  const fetchBookmarks = async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getBookmarksByUser({ userId });
      if (response.success) {
        console.log(response.data)

        if(!response.data){
          return
        }
        setBookmarks(response.data);
      } else {
        setError(response.error || "Unknown error");
      }
    } catch (err) {
      console.error("[BOOKMARK_FETCH_ERROR]", err);
      setError("Error fetching bookmarks");
    } finally {
      setLoading(false);
    }
  };

  // Add a bookmark
  const addToBookmarks = async (userId: string, listingId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createBookmark({ userId, listingId });
      if (response.success && response.data) {
        setBookmarks((prev) => [...prev, response.data as BookmarkWithListing]);
      } else {
        setError(response.error || "Unknown error");
      }
    } catch (err) {
      console.error("[BOOKMARK_ADD_ERROR]", err);
      setError("Error adding bookmark");
    } finally {
      setLoading(false);
    }
  };

  // Remove a bookmark
  const removeFromBookmarks = async (userId: string, listingId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deleteBookmark({ userId, listingId });
      if (response.success && response.data) {
        setBookmarks((prev) =>
          prev.filter((bookmark) => bookmark.listingId !== listingId)
        );
      } else {
        setError(response.error || "Unknown error");
      }
    } catch (err) {
      console.error("[BOOKMARK_REMOVE_ERROR]", err);
      setError("Error removing bookmark");
    } finally {
      setLoading(false);
    }
  };

  // Check if a bookmark exists
  const isBookmarked = async (userId: string, listingId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await checkBookmarkExists({ userId, listingId });
      return response.success && response.exists;
    } catch (err) {
      console.error("[BOOKMARK_CHECK_ERROR]", err);
      setError("Error checking bookmark");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        loading,
        error,
        fetchBookmarks,
        addToBookmarks,
        removeFromBookmarks,
        isBookmarked,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

// Custom hook for accessing the Bookmark context
export function useBookmark() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmark must be used within a BookmarkProvider");
  }
  return context;
}
