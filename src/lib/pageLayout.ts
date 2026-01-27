/**
 * Page Layout Engine
 *
 * Handles content distribution across A4 pages for the biodata.
 * Ensures WYSIWYG: website display matches PDF output exactly.
 */

// A4 dimensions
export const A4_WIDTH_MM = 210;
export const A4_HEIGHT_MM = 297;

// Convert mm to pixels at 96 DPI
export const MM_TO_PX = 96 / 25.4; // ~3.78 px per mm

// A4 dimensions in pixels
export const A4_WIDTH_PX = Math.round(A4_WIDTH_MM * MM_TO_PX);  // ~794px
export const A4_HEIGHT_PX = Math.round(A4_HEIGHT_MM * MM_TO_PX); // ~1123px

// Page content area (inside border and padding)
export const PAGE_PADDING = {
  top: 10,      // px
  bottom: 10,   // px
  left: 37,     // px - matches biodata-inner-content padding
  right: 37,    // px
};

// Header height (Krishna icon + name) - only on first page
export const HEADER_HEIGHT = 80; // px approximate

// Footer/page number height
export const PAGE_NUMBER_HEIGHT = 25; // px

// Usable content height per page (in pixels)
export const getUsableHeight = (isFirstPage: boolean): number => {
  const baseHeight = A4_HEIGHT_PX - PAGE_PADDING.top - PAGE_PADDING.bottom;
  // First page has header, subsequent pages have page number
  if (isFirstPage) {
    return baseHeight - HEADER_HEIGHT;
  }
  return baseHeight - PAGE_NUMBER_HEIGHT;
};

// First page usable height
export const FIRST_PAGE_USABLE_HEIGHT = getUsableHeight(true);

// Subsequent pages usable height
export const OTHER_PAGE_USABLE_HEIGHT = getUsableHeight(false);

/**
 * Represents a measurable content block
 */
export interface ContentBlock {
  id: string;
  height: number;
  type: 'header' | 'photo' | 'section' | 'photo-gallery' | 'footer';
  mustBeOnFirstPage?: boolean; // Header and photo must be on first page
  element?: HTMLElement;
}

/**
 * Represents a page with its assigned content blocks
 */
export interface PageAssignment {
  pageNumber: number;
  blocks: ContentBlock[];
  usedHeight: number;
  remainingHeight: number;
}

/**
 * Distributes content blocks across pages using a greedy bin-packing algorithm.
 * Ensures:
 * - Header and photo stay on first page
 * - Sections are not split (kept together)
 * - Footer goes on the last page
 */
export function distributeContent(blocks: ContentBlock[]): PageAssignment[] {
  const pages: PageAssignment[] = [];

  // Separate blocks by type
  const headerBlocks = blocks.filter(b => b.mustBeOnFirstPage);
  const contentBlocks = blocks.filter(b => !b.mustBeOnFirstPage && b.type !== 'footer');
  const footerBlocks = blocks.filter(b => b.type === 'footer');

  // Start with first page
  let currentPage: PageAssignment = {
    pageNumber: 1,
    blocks: [],
    usedHeight: 0,
    remainingHeight: FIRST_PAGE_USABLE_HEIGHT,
  };

  // Add header blocks to first page (they must fit)
  for (const block of headerBlocks) {
    currentPage.blocks.push(block);
    currentPage.usedHeight += block.height;
    currentPage.remainingHeight -= block.height;
  }

  // Add content blocks, creating new pages as needed
  for (const block of contentBlocks) {
    if (block.height <= currentPage.remainingHeight) {
      // Block fits on current page
      currentPage.blocks.push(block);
      currentPage.usedHeight += block.height;
      currentPage.remainingHeight -= block.height;
    } else {
      // Block doesn't fit, start a new page
      pages.push(currentPage);

      const newPageNumber = pages.length + 1;
      currentPage = {
        pageNumber: newPageNumber,
        blocks: [block],
        usedHeight: block.height,
        remainingHeight: OTHER_PAGE_USABLE_HEIGHT - block.height,
      };
    }
  }

  // Add footer blocks to the last page
  for (const block of footerBlocks) {
    if (block.height <= currentPage.remainingHeight) {
      currentPage.blocks.push(block);
      currentPage.usedHeight += block.height;
      currentPage.remainingHeight -= block.height;
    } else {
      // Footer doesn't fit, create new page for it
      pages.push(currentPage);

      const newPageNumber = pages.length + 1;
      currentPage = {
        pageNumber: newPageNumber,
        blocks: [block],
        usedHeight: block.height,
        remainingHeight: OTHER_PAGE_USABLE_HEIGHT - block.height,
      };
    }
  }

  // Don't forget the last page
  pages.push(currentPage);

  return pages;
}

/**
 * Measures the height of rendered content blocks in a container
 */
export function measureContentBlocks(container: HTMLElement): ContentBlock[] {
  const blocks: ContentBlock[] = [];

  // Measure header (if exists)
  const header = container.querySelector('[data-block="header"]');
  if (header) {
    blocks.push({
      id: 'header',
      height: (header as HTMLElement).offsetHeight,
      type: 'header',
      mustBeOnFirstPage: true,
      element: header as HTMLElement,
    });
  }

  // Measure photo section (if exists)
  const photo = container.querySelector('[data-block="photo"]');
  if (photo) {
    blocks.push({
      id: 'photo',
      height: (photo as HTMLElement).offsetHeight,
      type: 'photo',
      mustBeOnFirstPage: true,
      element: photo as HTMLElement,
    });
  }

  // Measure each section
  const sections = container.querySelectorAll('[data-block="section"]');
  sections.forEach((section, index) => {
    blocks.push({
      id: `section-${index}`,
      height: (section as HTMLElement).offsetHeight,
      type: 'section',
      element: section as HTMLElement,
    });
  });

  // Measure photo gallery
  const photoGallery = container.querySelector('[data-block="photo-gallery"]');
  if (photoGallery) {
    blocks.push({
      id: 'photo-gallery',
      height: (photoGallery as HTMLElement).offsetHeight,
      type: 'photo-gallery',
      element: photoGallery as HTMLElement,
    });
  }

  // Measure footer
  const footer = container.querySelector('[data-block="footer"]');
  if (footer) {
    blocks.push({
      id: 'footer',
      height: (footer as HTMLElement).offsetHeight,
      type: 'footer',
      element: footer as HTMLElement,
    });
  }

  return blocks;
}

/**
 * Determines how many pages are needed for given content height
 */
export function calculatePageCount(totalContentHeight: number): number {
  if (totalContentHeight <= FIRST_PAGE_USABLE_HEIGHT + HEADER_HEIGHT) {
    return 1;
  }

  // First page takes what it can
  let remainingHeight = totalContentHeight - FIRST_PAGE_USABLE_HEIGHT - HEADER_HEIGHT;
  let pageCount = 1;

  while (remainingHeight > 0) {
    remainingHeight -= OTHER_PAGE_USABLE_HEIGHT;
    pageCount++;
  }

  return pageCount;
}

/**
 * Checks if content will overflow a single page
 */
export function willOverflow(totalContentHeight: number): boolean {
  return totalContentHeight > (A4_HEIGHT_PX - PAGE_PADDING.top - PAGE_PADDING.bottom);
}
