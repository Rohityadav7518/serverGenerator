const fs = require('fs');

function generateJsServer(config) {
    const routes = config.routes.map(route => `
app.${route.method.toLowerCase()}('${route.path}', (req, res) => {
    res.json({ message: "${route.response}" });
});
    `).join('');

    const serverCode = `
   const express = require('express');
 const cors = require('cors');
  const morgan = require('morgan');

   const app = express();


   app.use(express.json());
  app.use(cors());
  app.use(morgan('dev'));

   ${routes}

 app.listen(${config.port}, '${config.host}', () => {
    console.log(\`Server running at http://${config.host}:${config.port}\`);
  });
    `;

    fs.writeFileSync('server.js', serverCode);
    console.log('JavaScript server generated: server.js');
}

function main() {
    const config = JSON.parse(fs.readFileSync('server_config.json', 'utf8'));

    if (config.language === 'javascript') {
        generateJsServer(config);
    } else {
        console.log('Unsupported language specified in config.');
    }
}

main();
