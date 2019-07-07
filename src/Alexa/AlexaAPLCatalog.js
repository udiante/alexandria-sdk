/**
 * Provides a default catalog of APL (Alexa Presentation Language) documents and their dataSources
 */

const CATALOG = {
    APL_Simple_Icon_Text: {
        document: require('./APL/APL_Simple_Icon_Text/document.json'),
        dataSource: require('./APL/APL_Simple_Icon_Text/dataSource')
    }
}


module.exports = {
    APL_Simple_Icon_Text: CATALOG.APL_Simple_Icon_Text
}