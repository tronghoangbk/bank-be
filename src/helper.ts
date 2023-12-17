import dotenv from "dotenv";
dotenv.config();

const DOMAIN = process.env.DOMAIN || "";

const getUrlUpload = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${DOMAIN}/api/public/${path}`;
};

export { getUrlUpload };
