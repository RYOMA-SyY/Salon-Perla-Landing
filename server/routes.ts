import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { authLimiter } from "./rate-limiter";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Example: Apply strict rate limiting to authentication routes
  // app.post("/api/auth/login", authLimiter, async (req, res) => {
  //   // login logic here
  // });
  
  // app.post("/api/auth/register", authLimiter, async (req, res) => {
  //   // registration logic here
  // });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  return httpServer;
}
