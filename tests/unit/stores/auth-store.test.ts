import { describe, it, expect, beforeEach } from "vitest";
import { useAuthStore } from "@/stores/auth-store";

describe("AuthStore", () => {
  beforeEach(() => {
    // Reset store before each test
    useAuthStore.getState().reset();
  });

  it("initializes with default state", () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isLoading).toBe(false);
  });

  it("sets loading state", () => {
    useAuthStore.getState().setLoading(true);
    expect(useAuthStore.getState().isLoading).toBe(true);
  });

  it("logs in user", () => {
    const mockUser = {
      id: "1",
      email: "test@example.com",
      name: "Test User",
      provider: "email" as const,
    };

    useAuthStore.getState().login(mockUser);
    const state = useAuthStore.getState();

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  it("logs out user", () => {
    // First login
    useAuthStore.getState().login({
      id: "1",
      email: "test@example.com",
      name: "Test User",
      provider: "email",
    });

    // Then logout
    useAuthStore.getState().logout();
    const state = useAuthStore.getState();

    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it("resets state", () => {
    // Set some state
    useAuthStore.getState().login({
      id: "1",
      email: "test@example.com",
      name: "Test User",
      provider: "google",
    });

    // Reset
    useAuthStore.getState().reset();
    const state = useAuthStore.getState();

    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isLoading).toBe(false);
  });
});
