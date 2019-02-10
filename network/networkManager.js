const request = require('request-promise')
const { URL } = require('url')

/**
 * Make a GET request
 * @param baseUrl String
 * @param params Object
 * @returns { response }
 */
exports.get = async (baseUrl, params) => {
  try{
    const requestUrl = new URL(baseUrl)
    Object.keys(params).forEach(key => {
      requestUrl.searchParams.append(key, params[key])
    })
    return await request(requestUrl.toString()).then(res=>JSON.parse(res))
  }
  catch (e){
    return { error: 'Internal server error.'}
  }
}