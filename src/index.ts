import index from "./index.html";
import { stream } from "./lib/datastar";

let count = 0;

const server = Bun.serve({
  port: 3000,
  routes: {
    "/": index,
    "/api/increment": async () => {
      count++;

      return stream((stream) => {
        stream.patchElements(`<div id="count">${count}</div>`);
        stream.patchSignals({
          doubleCount: count * 2,
        });
      });
    },
  },
  development: {
    hmr: true,
    console: true,
  },
});

console.log(`Server running at ${server.url}`);
