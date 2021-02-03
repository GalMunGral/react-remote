import React, { useEffect, useState } from "react";
import ReactTinyDOM from "./renderer.mjs";
import dom from "./dom.mjs";

const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return React.createElement(
    "div",
    null,
    Array(count)
      .fill(0)
      .map((_, i) => React.createElement("div", { key: i }, i))
  );
};

import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();
app.use("*", (req, res) => {
  res.send(dom.serialize());
});

const server = http.createServer(app);
const ws = new WebSocket.Server({ server, path: "/ws-test" });
ws.on("connection", function connection(s) {
  s.on("message", function incoming(message) {
    console.log("received: %s", message);
  });
  s.send("something");
});

server.listen(3000, () => console.log("ah"));

ReactTinyDOM(ws).render(
  React.createElement(App),
  dom.window.document.querySelector("#app")
);
