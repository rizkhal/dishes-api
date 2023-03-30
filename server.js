"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./src/app");
const port = process.env.PORT || 5000;
app_1.default.listen(port, () => {
    console.log(`⚡️[app]: Server is running at http://localhost:${port}`);
});
