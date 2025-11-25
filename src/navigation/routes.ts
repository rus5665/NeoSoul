export const ROUTES = {
  CHAPTERS: 'Chapters' as const,
  INTERVIEW: 'Interview' as const,
};

export type RouteNames = typeof ROUTES[keyof typeof ROUTES];

