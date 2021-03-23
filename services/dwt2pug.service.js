const html2pug = require('html2pug')

const fs = require('fs')
const fsPromises = fs.promises

function toTitleCase(str) {
  const regex = /\w\S*/g
  return str.replace(regex, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

function html2pugWorkaround(pug) {
  // The following code works around a bug in html2pug
  const pugOut = pug.split('\n')
  const regexA = /^\s+\|\s+$/
  const regexB = /^\S/
  let indxB = pugOut.length - 1
  for (let indxA = indxB - 1; indxA >= 0; indxA--, indxB--) {
    if (regexA.test(pugOut[indxA]) && regexB.test(pugOut[indxB])) {
      pugOut[indxA] += pugOut[indxB]
      pugOut.splice(indxB, 1)
    }
  }
  return pugOut.join('\n')
}

function insertPugBlocks(pug) {
  const pugOut = pug.split('\n')
  const regexA = /\/\/  TemplateBeginEditable name\=/
  const regexB = /"(.*?)"/
  const regexC = /\/\/  TemplateEndEditable/
  let block
  let indention = ''
  let blockName = ''
  for (let indx = 0; indx < pugOut.length; indx++) {
    if (regexA.test(pugOut[indx])) {
      block = pugOut[indx]
      indention = block.slice(0, block.search(regexA))
      block = block.match(regexB)
      blockName = block[1]
      pugOut[indx] += '\n' + indention + 'block ' + toTitleCase(blockName)
      // replace Doctitle block
      if (blockName === 'Doctitle') {
        indx++
        while (!regexC.test(pugOut[indx])) {
          pugOut.splice(indx, 1)
        }
      }
      // replace Content block
      if (blockName === 'Content') {
        indx++
        while (!regexC.test(pugOut[indx])) {
          pugOut.splice(indx, 1)
        }
      }
    }
  }
  return pugOut.join('\n')
}

function fileOlderThanFile(dwtFilePath, pugFilePath) {
  const dwtStats = fs.statSync(dwtFilePath)
  try {
    const pugStats = fs.statSync(pugFilePath)
    console.log(`${dwtStats.mtime} < ${pugStats.mtime}`)
    return dwtStats.mtime < pugStats.mtime
  } catch (e) {
    return false
  }
}

function dwt2pug(dwtFilePath, pugFilePath) {
  try {
    if (!fsPromises.access(dwtFilePath, fs.constants.R_OK)) {
      console.log(`Missing file ${dwtFilePath}`)
      return
    }
  } catch (err) {
    console.log(`Checking file ${dwtFilePath} threw an error:`)
    console.error(err)
    return
  }
  if (fileOlderThanFile(dwtFilePath, pugFilePath)) return
  console.log(`Converting Dreamweaver Template file ${dwtFilePath} to HTML...`)
  try {
    fs.readFile(dwtFilePath, 'utf8', (err, data) => {
      if (err) throw err
      let pug = html2pug(data, { tabs: true })
      console.log('html2pug completed')
      pug = html2pugWorkaround(pug)
      console.log('html2pugWorkaround completed')
      pug = insertPugBlocks(pug)
      console.log('insertPugBlocks completed')
      try {
        fs.writeFile(pugFilePath, pug, 'utf8', (err) => {
          if (err) throw err
          console.log('The file has been saved!')
        })
      } catch (err) {
        console.log(`Writing file ${pugFilePath} threw an error:`)
        console.error(err)
        return
      }
    })
  } catch (err) {
    console.log(`Reading file ${dwtFilePath} threw an error:`)
    console.error(err)
    return
  }
  console.log(`Template file ${dwtFilePath} converted.`)
}

module.exports = dwt2pug
