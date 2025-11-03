import type { JSXNode } from "hono/jsx";

export const Layout = ({ children }: { children: JSXNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Revivios" />
        <title>Revivios</title>
      </head>
      <body>{children}</body>
    </html>
  );
};
