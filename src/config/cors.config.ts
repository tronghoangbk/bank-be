const originOptions = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://cvidpro.net",
  "https://dev.cvidpro.net",
  "https://admin.cvidpro.net",
];

export const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowHeaders: ["Content-Type", "multipart/form-data"],
};
