console.log(
  '[Startup] Attempting to create Discovery subdomain...'.brightYellow.bold,
);

const express = require('express');
const fs = require('fs');
const path = require('path');
const { create } = require('xmlbuilder2');
const config = require('../config.json');
const router = express.Router();

const disc = create({ version: '1.0', encoding: 'UTF-8' })
  .ele('result')
  .ele('has_error')
  .txt('0')
  .up()
  .ele('version')
  .txt('1')
  .up()
  .ele('endpoint')
  .ele('host')
  .txt(`api.olv.${config.domain}`)
  .up()
  .ele('api_host')
  .txt(`api.olv.${config.domain}`)
  .up()
  .ele('portal_host')
  .txt(`portal.olv.${config.domain}`)
  .up()
  .ele('n3ds_host')
  .txt(`ctr.olv.${config.domain}`)
  .up()
  .up()
  .up()
  .doc();

const xml = disc.end({ prettyPrint: true });

if (!fs.existsSync('public/discovery')) {
  fs.mkdirSync('public/discovery');
}

fs.writeFileSync('public/discovery/discovery.xml', xml);

router.get('/v1/endpoint', (req, res) => {
  res.header('Content-Type', 'application/xml');
  res.sendFile(path.join(__dirname, '../', 'public', 'xml', 'discovery.xml'));
});

module.exports = router;
