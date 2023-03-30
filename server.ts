import app from "./src/app";

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`⚡️[app]: Server is running at http://localhost:${port}`);
});
