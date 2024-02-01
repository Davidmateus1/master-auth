
/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes =[ '/'];

/**
 * An array of routes that are accessible to the public
 * These routes will redirect logged in users to /settigs
 * @type {string[]}
 */
export const authRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/error'
];

/**
 * An array of routes that are accessible to the public
 * Routes that start with this prefix are used for api authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings';
