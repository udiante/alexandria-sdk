var dateFormat = require('dateformat');

exports.randomString = function (posibleValue) {
    if (Array.isArray(posibleValue)) {
        return this.randomValueFromArray(posibleValue)
    }
    else {
        return posibleValue
    }
}

exports.randomIntFromInterval = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

exports.randomValueFromArray = function (array) {
    return array[this.randomIntFromInterval(0, array.length - 1)] || '';
}

exports.cleanStringForCard = function (rawString) {
    return rawString.replace(/(<([^>]+)>)/ig, '')
}

exports.dateInUTCOffset = function (offset) {
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (3600000 * offset));
    var a = "The local time is " + nd.toLocaleString();
    return nd
}

exports.getStringHour = function (date) {
    return dateFormat(date, 'HH:MM')
}

exports.getDayString = function (date) {
    return dateFormat(date, 'yyyymmdd')
}

exports.getDateFromUTC = function (rawDate) {
    return new Date(rawDate)
}

exports.formatDate = function (date, format) {
    return dateFormat(date, format)
}

exports.convertToDateInJapan = function (d) {
    var offset = 9
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (3600000 * offset));
    return nd
}

exports.formatearDivisa = function formatCurrencyValue(rawValue, enableMilSeparator = false, numberOfDecimals = 2) {
    if (typeof rawValue === 'string' || rawValue instanceof String) {
        rawValue = formatValue(rawValue)
    }
    var stringValue = parseFloat(rawValue).toFixed(numberOfDecimals).toString()
    if (enableMilSeparator) {
        stringValue = parseFloat(rawValue).toFixed(numberOfDecimals).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    return stringValue.replace(".", ",")
}

exports.floatToStringFormatted = function (rawValue) {
    const enableMilSeparator = false
    const numberOfDecimals = 2
    if (typeof rawValue === 'string' || rawValue instanceof String) {
        rawValue = parseFloat(rawValue)
    }
    var stringValue = parseFloat(rawValue).toFixed(numberOfDecimals).toString()
    if (enableMilSeparator) {
        stringValue = parseFloat(rawValue).toFixed(numberOfDecimals).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    return stringValue.replace(".", ",")
}

exports.formatearListadoStrings = function (listadoStrings, separador, ultimoSeparador) {
    if (!listadoStrings || !separador || !ultimoSeparador) {
        return ''
    }
    else {
        var string = ''
        var breakSeparator = separador
        var lastSeparator = ultimoSeparador
        var currentIterador = 1
        listadoStrings.forEach(valor => {
            var separatorString = breakSeparator
            if (currentIterador == listadoStrings.length - 1) {
                separatorString = lastSeparator
            }
            if (currentIterador == listadoStrings.length) {
                separatorString = ''
            }
            string = string + valor + separatorString
            currentIterador++
        });
        return string
    }
}

/// Transforma el array proporcioando en un string formateado con el formto: 1. X, 2.X, ... "y finalmente" X
exports.listarArrayString = function (listadoStrings, useCardinal = true) {
    if (!listadoStrings) {
        return ''
    }
    var ultimoSeparador = ', Y finalmente, '
    if (listadoStrings.length < 4) {
        // Para listados pequeños no ponemos un finalmente
        ultimoSeparador = undefined
    }
    var string = ''
    var currentIterador = 1
    listadoStrings.forEach(valor => {
        var cardinalString = 'º'
        if (!useCardinal) {
            cardinalString = ''
        }
        var separatorString = ', ' + currentIterador +cardinalString + '. '
        if (ultimoSeparador && currentIterador == listadoStrings.length) {
            separatorString = ultimoSeparador
        }
        string = string + separatorString + valor
        currentIterador++
    });
    return string
}