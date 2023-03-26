import server from "./server";

const port = process.env.PORT || 5000;

server.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  /* eslint-enable no-console */
});
