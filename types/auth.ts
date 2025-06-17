export type JWTPayload = {
  id: string;
  email: string;
  displayName: string;
  role: "user" | "admin";
};
