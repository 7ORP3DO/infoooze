const request = require('request');
const chalk = require('chalk');

const {
  list,
  goBack,
  input,
  errorMsg,
  currentTimeStamp,
  info,
  saveTo,
} = require('./common.js');

const dnsLookup = async (website, showHome = false, i = 1) => {
  var website = website || (await input('Your Website'));
  const path = `${process.cwd()}/results/infoooze_dnsLookup_${currentTimeStamp()}.txt`;
  info(`Results will be saved in `, path);

  request(
    {
      url: `https://api.hackertarget.com/dnslookup/?q=${website}`,
      timeout: 5000,
      json: true,
    },
    async function (error, response) {
      if (!error && response.statusCode == 200) {
        let dnsData = response.body;

        dnsData.split('\n').forEach(async function (e) {
          list(i++, e.split(' : ')[0], e.split(' : ')[1]);
          saveTo(path, e.split(' : ')[0], e.split(' : ')[1]);
        });
      } else {
        errorMsg();
      }
    },
  );
};

module.exports = dnsLookup;
