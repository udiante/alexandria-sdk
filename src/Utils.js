module.exports = {
    supportsAPL(handlerInput) {
        const {supportedInterfaces} = handlerInput.requestEnvelope.context.System.device;
        return supportedInterfaces['Alexa.Presentation.APL'] ? true : false;
    }
}