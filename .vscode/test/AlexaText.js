const AlexaUtils = require('../../index').AlexaUtils
const AlexaResponseHandler = require('../../index').AlexaResponseHandler

const assert = require('assert')

//Alexa Response Handler Test
function testHandler() {
    var objectResponse = AlexaResponseHandler.newResponseModel()

    // Function APL
    assert(!objectResponse.hasAPL())
    objectResponse.APL.document = "nonNulAPLDocument"
    assert(objectResponse.hasAPL())

    // Function Reprompt
    assert(!objectResponse.hasValidReprompt())
    objectResponse.reprompt = "Repropmt text"
    assert(objectResponse.hasValidReprompt())
}

function test() {
    testHandler()
}

test()