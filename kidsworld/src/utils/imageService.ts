const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY || '';
const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY || '';

interface ImageResult {
  urls: string[];
  source: 'unsplash' | 'pexels' | 'wikimedia' | 'placeholder';
}

// In-memory cache for country images (15 minutes TTL)
const imageCache = new Map<string, { result: ImageResult; timestamp: number }>();
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

/**
 * Fetch real, country-specific images for educational purposes
 * Priority: Unsplash > Pexels > Wikimedia > Placeholder
 */
export async function fetchCountryImages(countryName: string): Promise<ImageResult> {
  // Check cache first
  const cached = imageCache.get(countryName);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.result;
  }

  // Try Unsplash first (best quality, curated)
  if (UNSPLASH_ACCESS_KEY && UNSPLASH_ACCESS_KEY !== 'YOUR_UNSPLASH_ACCESS_KEY') {
    try {
      const unsplashImages = await fetchFromUnsplash(countryName);
      if (unsplashImages.length > 0) {
        const result = { urls: unsplashImages, source: 'unsplash' as const };
        imageCache.set(countryName, { result, timestamp: Date.now() });
        return result;
      }
    } catch (error) {
      console.warn('Unsplash fetch failed:', error);
    }
  }

  // Try Pexels second
  if (PEXELS_API_KEY && PEXELS_API_KEY !== 'YOUR_PEXELS_API_KEY') {
    try {
      const pexelsImages = await fetchFromPexels(countryName);
      if (pexelsImages.length > 0) {
        const result = { urls: pexelsImages, source: 'pexels' as const };
        imageCache.set(countryName, { result, timestamp: Date.now() });
        return result;
      }
    } catch (error) {
      console.warn('Pexels fetch failed:', error);
    }
  }

  // Try Wikimedia Commons as fallback (free, reliable)
  try {
    const wikimediaImages = await fetchFromWikimedia(countryName);
    if (wikimediaImages.length > 0) {
      const result = { urls: wikimediaImages, source: 'wikimedia' as const };
      imageCache.set(countryName, { result, timestamp: Date.now() });
      return result;
    }
  } catch (error) {
    console.warn('Wikimedia fetch failed:', error);
  }

  // Final fallback: placeholder
  const result = {
    urls: getPlaceholderImages(),
    source: 'placeholder' as const
  };
  return result;
}

/**
 * Fetch from Unsplash with multi-query strategy
 * Priority: landmarks > nature > culture
 */
async function fetchFromUnsplash(countryName: string): Promise<string[]> {
  const queries = [
    `${countryName} landmarks famous`,
    `${countryName} architecture`,
    `${countryName} nature landscape`
  ];

  for (const query of queries) {
    try {
      const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=3&orientation=landscape&content_filter=high&client_id=${UNSPLASH_ACCESS_KEY}`;

      const response = await fetch(url);

      if (!response.ok) {
        continue;
      }

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        return data.results.slice(0, 3).map((photo: any) => photo.urls.regular);
      }
    } catch (error) {
      console.warn(`Unsplash query "${query}" failed:`, error);
      continue;
    }
  }

  return [];
}

/**
 * Fetch from Pexels with multi-query strategy
 */
async function fetchFromPexels(countryName: string): Promise<string[]> {
  const queries = [
    `${countryName} landmarks`,
    `${countryName} famous places`,
    `${countryName} landscape`
  ];

  for (const query of queries) {
    try {
      const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=3&orientation=landscape`;

      const response = await fetch(url, {
        headers: {
          'Authorization': PEXELS_API_KEY
        }
      });

      if (!response.ok) {
        continue;
      }

      const data = await response.json();

      if (data.photos && data.photos.length > 0) {
        return data.photos.slice(0, 3).map((photo: any) => photo.src.large);
      }
    } catch (error) {
      console.warn(`Pexels query "${query}" failed:`, error);
      continue;
    }
  }

  return [];
}

/**
 * Fetch from Wikimedia Commons
 * Searches for images related to the country
 */
async function fetchFromWikimedia(countryName: string): Promise<string[]> {
  try {
    // Search for files related to the country
    const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(countryName)}&srnamespace=6&srlimit=10&format=json&origin=*`;

    const searchResponse = await fetch(searchUrl);
    if (!searchResponse.ok) {
      return [];
    }

    const searchData = await searchResponse.json();
    if (!searchData.query?.search || searchData.query.search.length === 0) {
      return [];
    }

    // Get image URLs for the first 3 results
    const imageUrls: string[] = [];
    for (let i = 0; i < Math.min(3, searchData.query.search.length); i++) {
      const title = searchData.query.search[i].title;

      // Get image info
      const imageInfoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json&origin=*`;

      const infoResponse = await fetch(imageInfoUrl);
      if (!infoResponse.ok) continue;

      const infoData = await infoResponse.json();
      const pages = infoData.query?.pages;

      if (pages) {
        const page = Object.values(pages)[0] as any;
        if (page.imageinfo && page.imageinfo[0]?.thumburl) {
          imageUrls.push(page.imageinfo[0].thumburl);
        }
      }
    }

    return imageUrls;
  } catch (error) {
    console.warn('Wikimedia fetch failed:', error);
    return [];
  }
}

/**
 * Placeholder images - friendly Earth character
 * Used when all API sources fail
 */
function getPlaceholderImages(): string[] {
  return [
    '/pngtree-a-cute-3d-cartoon-earth-character-smiling-and-wearing-sunglasses-carrying-png-image_16340561-removebg-preview.png',
    '/pngtree-a-cute-3d-cartoon-earth-character-smiling-and-wearing-sunglasses-carrying-png-image_16340561-removebg-preview.png',
    '/pngtree-a-cute-3d-cartoon-earth-character-smiling-and-wearing-sunglasses-carrying-png-image_16340561-removebg-preview.png'
  ];
}
