export interface TocItem {
  title: string;
  id: string;
  subsections?: TocItem[];
}

export interface Frontmatter {
  title: string;
  description?: string;
  lastUpdatedAt: string;
  metaTitle: string;
  metaDescription: string;
}
