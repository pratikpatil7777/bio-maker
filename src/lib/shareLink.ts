/**
 * Share Link Utility - Zero-cloud biodata sharing
 *
 * This creates a URL that contains the entire biodata data encoded in it.
 * When someone opens the link, the biodata loads directly from the URL.
 *
 * Benefits:
 * - No server/database needed
 * - Link works forever (no expiration)
 * - Works offline once loaded
 * - Private (no data stored anywhere)
 */

import { DynamicBiodataData } from './types';
import LZString from 'lz-string';

const SHARE_PARAM = 'biodata';

/**
 * Encode biodata data into a shareable URL
 * Uses LZ-String for compression to keep URLs manageable
 */
export function encodeShareLink(data: DynamicBiodataData, baseUrl: string): string {
  try {
    // Create a minimal version of the data (without photo for size)
    const shareData = {
      ...data,
      // Remove photo to keep URL smaller (photos are too large)
      photo: '',
      // Keep the rest
    };

    // Convert to JSON
    const json = JSON.stringify(shareData);

    // Compress using LZ-String for smaller URLs
    const compressed = LZString.compressToEncodedURIComponent(json);

    // Create the shareable URL
    const url = new URL(baseUrl);
    url.searchParams.set(SHARE_PARAM, compressed);

    return url.toString();
  } catch (error) {
    console.error('Error encoding share link:', error);
    throw new Error('Failed to create share link');
  }
}

/**
 * Decode biodata data from a shareable URL
 */
export function decodeShareLink(url: string): DynamicBiodataData | null {
  try {
    const urlObj = new URL(url);
    const compressed = urlObj.searchParams.get(SHARE_PARAM);

    if (!compressed) {
      return null;
    }

    // Decompress
    const json = LZString.decompressFromEncodedURIComponent(compressed);

    if (!json) {
      console.error('Failed to decompress share data');
      return null;
    }

    // Parse JSON
    const data = JSON.parse(json) as DynamicBiodataData;

    return data;
  } catch (error) {
    console.error('Error decoding share link:', error);
    return null;
  }
}

/**
 * Check if current URL contains shared biodata
 */
export function hasShareData(): boolean {
  if (typeof window === 'undefined') return false;
  const urlObj = new URL(window.location.href);
  return urlObj.searchParams.has(SHARE_PARAM);
}

/**
 * Extract shared biodata from current URL
 */
export function getSharedData(): DynamicBiodataData | null {
  if (typeof window === 'undefined') return null;
  return decodeShareLink(window.location.href);
}

/**
 * Clear share data from URL (without reloading)
 */
export function clearShareFromUrl(): void {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  url.searchParams.delete(SHARE_PARAM);

  window.history.replaceState({}, '', url.toString());
}
