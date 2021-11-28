import { GitHubProject } from './interfaces';

const appCookieKey = 'GitHub Explorer Projects';

// Parsing JSON into a defined data structure means that some rules need to be disabled.

/**
 * Add given `project` to `localStorage`.
 * @param project `GitHubProject` to add to cookies
 */
export const addProject = (project: GitHubProject) => {
  const appCookies = localStorage.getItem(appCookieKey);
  if (appCookies) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const addedProjects: GitHubProject[] = JSON.parse(appCookies);
    localStorage.setItem(
      appCookieKey,
      JSON.stringify(addedProjects.concat(project))
    );
  } else {
    localStorage.setItem(appCookieKey, JSON.stringify([project]));
  }
};

/**
 * Removes `GitHubProject` with `id` from `localStorage`.
 * @param id for `GitHubProject` that will be removed.
 */
export const removeProject = (id: string) => {
  const appCookies = localStorage.getItem(appCookieKey);
  if (appCookies) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const projects: GitHubProject[] = JSON.parse(appCookies);
    localStorage.setItem(
      appCookieKey,
      JSON.stringify(projects.filter((proj) => proj.id !== id))
    );
  }
};

/**
 * Reads stored `GitHubProject`s from `localStorage`.
 * @returns a `GitHubProject` array which may be empty.
 */
export const getProjects = (): GitHubProject[] => {
  const appCookies = localStorage.getItem(appCookieKey);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return appCookies ? JSON.parse(appCookies) : [];
};
