import { createProxyServer } from "http-proxy";
import { ServerResponse } from "http";

export const proxyServer = createProxyServer({
  changeOrigin: true,
  secure: false,
  ignorePath: true,
});

proxyServer.on("error", (error, req, res) => {
  console.error(error.message);
  if (res instanceof ServerResponse) {
    res.writeHead(502, {
      "Content-Type": "text/plain"
    });
  }

  res.end("Failed to proxy request to target");
});
