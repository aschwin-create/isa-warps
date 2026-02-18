import { NextResponse } from "next/server";

const FLICKR_USER_ID = "203669814@N08";
const FLICKR_FEED_URL = `https://www.flickr.com/services/feeds/photos_public.gne?id=${FLICKR_USER_ID}&format=json&nojsoncallback=1`;

export async function GET() {
  try {
    const response = await fetch(FLICKR_FEED_URL, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Flickr API error: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      items: data.items || [],
    });
  } catch (error) {
    console.error("Error fetching Flickr photos:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch photos from Flickr",
        items: [],
      },
      { status: 500 }
    );
  }
}
