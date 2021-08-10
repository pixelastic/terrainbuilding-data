const postHelper = require('reddinx/helpers/posts.js');
const recordHelper = require('reddinx/helpers/records.js');
const config = require('reddinx/config.js');

(async () => {
  await config.init({
    cachePath: './tmp/cache',
  });
  const rawData = await postHelper.fromIds('terrainbuilding', ['kayqfy']);
  const rawPost = rawData[0];

  const record = await recordHelper.fromPost(rawPost);
  console.info(record);
})();
