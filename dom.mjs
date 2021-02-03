import { JSDOM } from "jsdom";
export default new JSDOM(`
  <body>
    <script>
      const ws = new WebSocket(\`ws://\${location.host}/ws-test\`);
      ws.addEventListener('message', e => {
        if (e.data === 'reload!') {
          location.reload();
        }
      })
    </script>
    <div id="app"></div>
  </body>
`);
