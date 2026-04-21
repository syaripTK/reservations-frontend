export const getFullImageUrl = (path) => {
  if (!path) return '/default.jpg';
  const baseUrl = import.meta.env.PUBLIC_API_URL;
  const fixedPath = path.startsWith('/api') ? path : `/api${path}`;
  return `${baseUrl}${fixedPath}`;
};
