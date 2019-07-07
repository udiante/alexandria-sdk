const AlexaUtils = require('./AlexaUtils')

/**
 * Response model with all the available values that the Response Handler can process
 */
var ResponseModel = {
    speechOut: '', // Speech to be read as a response
    reprompt: '', // Reprompt
    shouldEndSession: false, //If true the session will end
    sessionAttributes: {

    },
    APL: { // Alexa Presentation Lenguage properties
        document: undefined, //APL Document to be rendered 
        dataSources: {} //APL DataSources to be used with the document
    },
    CARD : { // Card data
        title : undefined, //String
        description : undefined, //String
        smallMediaUrl: undefined, //String
        largeMediaUrl: undefined, //String
    },
    properites: {
        shouldRepromptInTheSpeech: false //If true the reprompt will is sended in the scpeechOut with a delay.
    },
    hasValidReprompt: function () {
        return this.reprompt != undefined && this.reprompt != ''
    },
    hasAPL: function () {
        return this.APL.document != undefined
    }
}

module.exports.ResponseModel = ResponseModel

/**
 * @returns {ResponseModel} A valid response model to work with Response Handler
 */
module.exports.newResponseModel = function () {
    return Object.assign({}, ResponseModel)
}

/**
 * 
 * @param {Object} handlerInput 
 * @param {ResponseModel} responseObject 
 */
module.exports.buildResponse = function (handlerInput, responseObject) {
    var speakResponse = responseObject.speechOut

    if (responseObject.properites.shouldRepromptInTheSpeech && responseObject.hasValidReprompt() && !responseObject.shouldEndSession) {
        speakResponse = speakResponse + ' <break time="700ms"/> ' + responseObject.reprompt
    }

    var responseHandler = handlerInput.responseBuilder
        .speak(speakResponse)
        .withShouldEndSession(responseObject.shouldEndSession)

    if (responseObject.hasValidReprompt()) {
        responseHandler = handlerInput.responseBuilder
            .speak(speakResponse)
            .reprompt(responseObject.reprompt)
            .withShouldEndSession(responseObject.shouldEndSession)
    }

    if (responseObject.card && responseObject.card.title) {
        var card = responseObject.card
        responseHandler.withStandardCard(card.title, card.description, card.smallMediaUrl, card.largeMediaUrl)
    }

    if (responseObject.hasAPL() && AlexaUtils.supportsAPL(handlerInput))  {
        handlerInput.responseBuilder.addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            version: '1.0',
            document: responseObject.APL.document,
            datasources: responseObject.APL.dataSources
        });
    }

    return responseHandler.getResponse()
}