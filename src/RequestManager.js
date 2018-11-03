const axios = require('axios')

/**
 * @param {string} completionHandler Url 
 * @param {Object} queryParams Object with the query parameters
 */
async function getRequest(url, queryParams) {
    var response = undefined
    try {
        response = await axios.get(url, {
            params: queryParams
        })
        response = response
    } catch (error) {
        response = undefined
    }
    return response
}



module.exports = {
    getRequest: getRequest
}