const http = require('http');
const url = require('url');

const hostname = '0.0.0.0';
const port = 3000;

const SERVICE_KEY = 's';
const CHARACTERISTIC_KEY = 'c';
const VALUE_KEY = 'v';
const HELP_MESSAGE = `Usage: http://${hostname}:${port}/?${SERVICE_KEY}=SERVICE_UUID&${CHARACTERISTIC_KEY}=CHARACTERISTIC_UUID&${VALUE_KEY}=VALUE` +
    `. Where UUIDs are the short values. Example: SERVICE_UUID=180D (Heart Rate)`;

const startServer = (onCommandCallback) => {
    const server = http.createServer((req, res) => {
        const query = url.parse(req.url, true).query;
        const service = query[SERVICE_KEY];
        const characteristic = query[CHARACTERISTIC_KEY];
        const value = query[VALUE_KEY];
        var response = {}

        res.setHeader('Content-Type', 'text/javascript');

        if (service !== undefined && characteristic !== undefined && value !== undefined) {
            if (onCommandCallback) {
                onCommandCallback(service, characteristic, value);
            }

            res.statusCode = 200;
            response = {
                status: 'Accepted',
                data: {
                    service,
                    characteristic,
                    value,
                },
            }
        } else {
            res.statusCode = 200;
            response = {
                status: 'Rejected',
                reason: HELP_MESSAGE,
            }
        }

        res.end(JSON.stringify(response));
    });

    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    })
}

exports.start = startServer;
