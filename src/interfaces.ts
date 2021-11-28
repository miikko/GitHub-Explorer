export interface GitHubProject {
  id: string;
  name: string;
  url: string;
  rating: number;
  createdAt: Date;
}

export enum ProjectSortOption {
  DEFAULT = '',
  RATING_ASC = 'ratingAsc',
  RATING_DESC = 'ratingDesc',
  CREATED_ASC = 'createdAsc',
  CREATED_DESC = 'createdDesc',
}
