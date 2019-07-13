const AlexaUtils = require('./AlexaUtils')

var IntentData = {
    intentName: '',
    suportsAPL: false,
    locale: 'es-ES',
    sessionData: {},
    parameters: {}
}

module.exports.IntentData = IntentData

/**
 * @returns {IntentData} A valid response model to work with Response Handler
 */
module.exports.newResponseModel = function (handlerInput) {
    var intentData = Object.assign({}, IntentData)
    try {
        if (handlerInput) {
            intentData.suportsAPL = AlexaUtils.supportsAPL(handlerInput)
            intentData.locale = handlerInput.requestEnvelope.request.locale
            if (handlerInput.requestEnvelope.request.intent) {
                intentData.parameters = handlerInput.requestEnvelope.request.intent.slots
                intentData.intentName = handlerInput.requestEnvelope.request.intent.name
            }
            intentData.sessionData = handlerInput.attributesManager.getSessionAttributes()
        }
    } catch (error) {

    }
    return intentData
}
