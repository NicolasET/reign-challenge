export interface AlgoliaResponse {
  hits: Hit[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  exhaustive: Exhaustive;
  query: Query;
  params: string;
  processingTimeMS: number;
  processingTimingsMS: ProcessingTimingsMS;
}

export interface Exhaustive {
  nbHits: boolean;
  typo: boolean;
}

export interface Hit {
  created_at: null | string;
  title: null | string;
  url: null | string;
  author: null | string;
  points: null | number;
  story_text: null | string;
  comment_text: null | string;
  num_comments: null | number;
  story_id: null | number;
  story_title: null | string;
  story_url: null | string;
  parent_id: null | number;
  created_at_i: null | number;
  _tags: null | string[];
  objectID: null | string;
  _highlightResult: null | HighlightResult;
}

export interface HighlightResult {
  author: Author;
  comment_text: Author;
  story_title: Author;
  story_url: Author;
  title: Author;
  url: Author;
}

export interface Author {
  value: string;
  matchLevel: MatchLevel;
  matchedWords: Query[];
  fullyHighlighted: boolean;
}

export enum MatchLevel {
  Full = 'full',
  None = 'none',
}

export enum Query {
  Nodejs = 'nodejs',
}

export interface ProcessingTimingsMS {
  afterFetch: AfterFetch;
  fetch: Fetch;
  getIdx: number;
  total: number;
}

export interface AfterFetch {
  format: Format;
  total: number;
}

export interface Format {
  highlighting: number;
  total: number;
}

export interface Fetch {
  scanning: number;
  total: number;
}
