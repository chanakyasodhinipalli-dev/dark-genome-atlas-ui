import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// Setup mock service worker for browser (development)
export const worker = setupWorker(...handlers);
