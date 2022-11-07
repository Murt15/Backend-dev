const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {


    const url = req.url;
    const method = req.method;
    if (url === "/") {
        res.setHeader('Content-Type', 'text/html');
        fs.readFile('message.txt', 'utf8', (errr, data) => {


        
            res.write(`
                    <html>
                        <head>${data}</head>
                            <body>
                                <form action="/message" method="POST">
                                    <input type="text" name ="message">
                                    <button type ="submit">Send</button>
                                </form>
                            </body>
                    </html>`);
            
            return res.end();

        })

    }
    if (url === "/message" && method === "POST") {
        const body = [];
        req.on('data', (chunk) => {
            
            body.push(chunk);
        })
        req.on('end', () => {
            const parsed = Buffer.concat(body).toString();
            message = parsed.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
            


        })


    }


});

server.listen(4000);