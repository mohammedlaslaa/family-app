export const PUBLIC_API = process.env.PUBLIC_API;
export const PORT_API = process.env.PORT_API
  ? parseInt(process.env.PORT_API, 10)
  : 3000;
export const DATABASE_URI = process.env.DATABASE_URI;
