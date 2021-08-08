const indexing = require('algolia-indexing');
const readJson = require('firost/readJson');
const glob = require('firost/glob');
const consoleError = require('firost/consoleError');
const pMap = require('golgoth/pMap');

(async function () {
  const credentials = {
    appId: 'O3F8QXYK6R',
    apiKey: process.env.ALGOLIA_API_KEY,
    indexName: 'gamemaster_terrainbuilding',
  };
  const settings = {
    searchableAttributes: ['title', 'author.name'],
    attributesForFaceting: ['author.name', 'tags', 'misc.postHint'],
    customRanking: ['desc(date.day)', 'desc(score.value)', 'desc(score.ratio)'],
  };

  indexing.verbose();
  indexing.config({
    batchMaxSize: 100,
  });

  try {
    const files = await glob('./data/**/*.json');
    const records = await pMap(files, readJson);
    await indexing.fullAtomic(credentials, records, settings);
  } catch (err) {
    consoleError(err.message);
    process.exit(1);
  }
})();
