const fs = require('fs');
const https = require('https');

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FILE_KEY = 'IZNyI5Mi5mUlSn4HIoLaQs';

const options = {
    hostname: 'api.figma.com',
    path: `/v1/files/${FILE_KEY}?depth=2`,
    method: 'GET',
    headers: {
        'X-Figma-Token': FIGMA_TOKEN
    }
};

const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        if (res.statusCode === 200) {
            fs.writeFileSync('figma-data.json', data);
            console.log('Figma data fetched and saved to figma-data.json');

            const parsed = JSON.parse(data);
            console.log('Document name:', parsed.name);

            // Dump component sets metadata
            if (parsed.componentSets) {
                fs.writeFileSync('figma-components.json', JSON.stringify(parsed.componentSets, null, 2));
                console.log('Wait, let us check componentSets:', Object.keys(parsed.componentSets).length, 'sets found');
            }

            // Dump all instances of components directly
            if (parsed.components) {
                console.log('Components map:', Object.keys(parsed.components).length, 'components found');
                fs.writeFileSync('figma-components-raw.json', JSON.stringify(parsed.components, null, 2));
            }
        } else {
            console.error('Failed to fetch:', res.statusCode, data);
        }
    });
});

req.on('error', (e) => { console.error(e); });
req.end();
