const {
  html2pug,
  html2pugWorkaround,
  insertPugBlocks,
  fileOlderThanFile,
} = require('./dwt2pug.util')

const fs = require('fs')

function dwt2pug(dwtFilePath, pugFilePath) {
  try {
    if (!fs.promises.access(dwtFilePath, fs.constants.R_OK)) {
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
