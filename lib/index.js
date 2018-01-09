const fs = require('fs')
const path = require('path')

/**
 * Get filename.
 * @param {string} name
 * @returns {string}
 */
const getFilename = (name) => {
  const filename = path.resolve(__dirname, '../content', `${name}.json`)
  return filename
}

/**
 * Get file's content.
 * @param {string} path
 * @returns {Promise.<string>}
 */
const getData = (name) => new Promise((resolve, reject) => {
  const filename = getFilename(name)

  const options = {
    encoding: 'utf-8',
    flag: 'r'
  }

  fs.readFile(filename, options, (err, data) => {
    if (err) {
      reject(err)
      return
    }
    resolve(data)
  })
})

/**
 * Get data.
 * @param {string} name
 * @returns {Promise.<Data>}
 */
const getContent = async (name) => {
  try {
    const data = await getData(name)
    const content = JSON.parse(data)
    return content
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`No content found for "${name}".`)
    }
    throw error
  }
}

module.exports = getContent
