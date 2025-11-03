export const stream = (
  onStart: (stream: {
    patchElements: (html: string) => void;
    patchSignals: (obj: object) => void;
  }) => void,
): Response => {
  const stream = new ReadableStream({
    start: (c) => {
      onStart({
        patchElements: (html: string) => {
          c.enqueue("event: datastar-patch-elements\n");
          c.enqueue(`data: elements ${html}`);
          c.enqueue("\n\n");
        },
        patchSignals: (obj: object) => {
          c.enqueue("event: datastar-patch-signals\n");
          c.enqueue(`data: signals ${JSON.stringify(obj)}`);
          c.enqueue("\n\n");
        },
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Content-Type": "text/event-stream",
    },
  });
};
