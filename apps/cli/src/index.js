const express = require("express");
const open = require("open");
const config = require("./config");

(async () => {
  const {
    moxyApiRouter,
    childController,
    port,
    skipOpen,
    enableHealth,
    staticContentPath,
  } = await config();

  const app = express();

  if (enableHealth)
    app.get("/health", (req, res) => res.send({ status: "up" }));
  app.get("/", (req, res) => res.redirect("/web"));
  app.use("/web", express.static(staticContentPath));
  app.use(moxyApiRouter);

  app.listen(port, async () => {
    console.log(`API server started on port ${port}`);

    try {
      await childController.start();
    } catch (e) {
      console.error("Error while starting child server", e);
      process.exit(1);
    }

    console.log(`Access with browser at: http://localhost:${port}`);

    if (!skipOpen)
      try {
        await open(`http://localhost:${port}`);
      } catch (e) {
        console.error(
          `Error while opening browser at: http://localhost:${port}`,
          e
        );
      }
  });
})();
