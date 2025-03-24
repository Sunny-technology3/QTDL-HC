const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "components")));
app.use(express.static(path.join(__dirname, "styles")));
app.use(express.static(path.join(__dirname, "frontend")));
app.use(express.static(path.join(__dirname, "images")));
app.use(express.static(path.join(__dirname, "pages")));
app.use("/utilities", express.static(path.resolve(__dirname, "pages", "utilities")));

// app.use("/js", express.static(path.resolve(__dirname, "frontend", "js")));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

app.listen(process.env.PORT || 3000, () => console.log("Server running ...."));