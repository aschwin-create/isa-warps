export interface FlickrPhoto {
  id: string;
  title: string;
  link: string;
  media: { m: string };
  date_taken: string;
  description: string;
  published: string;
  author: string;
  author_id: string;
  tags: string;
}

export interface FlickrFeed {
  title: string;
  link: string;
  description: string;
  modified: string;
  generator: string;
  items: FlickrPhoto[];
}

export async function fetchFlickrPhotos(): Promise<FlickrPhoto[]> {
  try {
    console.log("Calling /api/flickr...");
    const response = await fetch("/api/flickr", {
      cache: "no-store", // Don't cache on client-side, server handles caching
    });

    console.log("API response status:", response.status);

    if (!response.ok) {
      throw new Error(`Failed to fetch Flickr photos: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("API response data:", data);
    return data.items || [];
  } catch (error) {
    console.error("Error fetching Flickr photos:", error);
    return [];
  }
}

// Convert Flickr medium size URL to large size
export function getFlickrLargeImage(mediumUrl: string): string {
  return mediumUrl.replace("_m.jpg", "_b.jpg");
}

// Extract tags from Flickr photo
export function getPhotoTags(photo: FlickrPhoto): string[] {
  return photo.tags ? photo.tags.split(" ").filter(Boolean) : [];
}

// Categorize photos based on tags or title
export function categorizePhoto(photo: FlickrPhoto): "action" | "portrait" | "training" | "team" {
  const tags = getPhotoTags(photo).map((t) => t.toLowerCase());
  const title = photo.title.toLowerCase();
  const description = photo.description.toLowerCase();
  const searchText = `${title} ${tags.join(" ")} ${description}`;

  if (
    searchText.includes("match") ||
    searchText.includes("game") ||
    searchText.includes("wedstrijd") ||
    searchText.includes("goal") ||
    searchText.includes("action") ||
    searchText.includes("actie")
  ) {
    return "action";
  }

  if (
    searchText.includes("portrait") ||
    searchText.includes("portret") ||
    searchText.includes("headshot") ||
    searchText.includes("close-up")
  ) {
    return "portrait";
  }

  if (
    searchText.includes("training") ||
    searchText.includes("practice") ||
    searchText.includes("oefening") ||
    searchText.includes("drill")
  ) {
    return "training";
  }

  if (
    searchText.includes("team") ||
    searchText.includes("squad") ||
    searchText.includes("group") ||
    searchText.includes("groep")
  ) {
    return "team";
  }

  // Default to action if no category matches
  return "action";
}
