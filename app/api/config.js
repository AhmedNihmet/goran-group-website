/**
 * Constructs an absolute URL using the request's origin and a provided pathname.
 *
 * @param {Request} request - The request object from which the origin is extracted.
 * @param {string} pathname - The path starting with '/' to be appended to the origin.
 * @returns {string} The absolute URL constructed by combining the request's origin and the provided pathname.
 */
export const buildUrl = (request, pathname) => {
  const { origin } = new URL(request.url);

  return `${origin}/${pathname}`;
};
