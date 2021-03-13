const html2pug = require('html2pug');

const html = '<header><h1 class="title">Hello World!</h1></header>'
const pug = html2pug(html, { tabs: true })

const fs = require('fs')

function html2pugWorkaround(pug) {
  // The following code works around a bug in html2pug
  const pugOut = pug.split('\n');
  const regexA = /^\s+\|\s+$/;
  const regexB = /^\S/;
  let indxB = pugOut.length - 1;
  for (let indxA = indxB - 1; indxA >= 0; indxA--, indxB--) {
    if (regexA.test(pugOut[indxA]) &&
        regexB.test(pugOut[indxB])) {
      pugOut[indxA] += pugOut[indxB];
      pugOut.splice(indxB, 1);
    }
  }
  return pugOut.join('\n');
}

module.exports = function (dwtFilePath, pugFilePath) {
  try {
    if (!fs.existsSync(dwtFilePath)) {
      console.log(`Missing file ${dwtFilePath}`);
      return;
    }
  } catch(err) {
    console.log(`Checking file ${dwtFilePath} threw an error:`);
    console.error(err);
    return;
  }
  console.log(
    `Converting Dreamweaver Template file ${dwtFilePath} to HTML...`);
  try {
    fs.readFile(dwtFilePath, 'utf8', (err, data) => {
      if (err) throw err;
      let pug = html2pug(data, { tabs: true });
      console.log('html2pug executed');
      pug = html2pugWorkaround(pug);
      try {
        fs.writeFile(pugFilePath, pug, 'utf8', (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
        });
      } catch(err) {
        console.log(`Writing file ${pugFilePath} threw an error:`);
        console.error(err);
        return;
      }
    });
  } catch(err) {
    console.log(`Reading file ${dwtFilePath} threw an error:`);
    console.error(err);
    return;
  }
}
