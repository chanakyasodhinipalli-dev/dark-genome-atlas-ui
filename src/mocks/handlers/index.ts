import { http, HttpResponse } from "msw";

// Define handlers for API mocking
export const handlers = [
  // Auth endpoints
  http.post("/api/auth/login", async ({ request }) => {
    const body = await request.json() as { email: string; password: string };

    // Mock successful login
    if (body.email && body.password) {
      return HttpResponse.json({
        data: {
          user: {
            id: "1",
            email: body.email,
            name: body.email.split("@")[0],
            provider: "email",
          },
          token: "mock-jwt-token",
        },
      });
    }

    return HttpResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }),

  http.post("/api/auth/google", () => {
    return HttpResponse.json({
      data: {
        user: {
          id: "2",
          email: "user@gmail.com",
          name: "Google User",
          provider: "google",
        },
        token: "mock-google-jwt-token",
      },
    });
  }),

  http.post("/api/auth/enterprise", async ({ request }) => {
    const body = await request.json() as { email: string };

    return HttpResponse.json({
      data: {
        redirectUrl: `https://sso.example.com/auth?email=${body.email}`,
      },
    });
  }),

  http.post("/api/auth/logout", () => {
    return HttpResponse.json({ message: "Logged out successfully" });
  }),
];
