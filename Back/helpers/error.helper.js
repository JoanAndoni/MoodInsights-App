//helpers/error.helper.js
'use strict'
// Lang default español

// 3xx Redirecciones =================================================
//El cliente tiene que tomar una acción adicional para completar la petición.
exports.movedPermanently = (err, req, res) => {
    let lang = req.headers.lang;
    let customMessage = ''
    let message = ''
    if (lang == 'en'){
        customMessage = 'Moved Permanently' + (err.message ? ': ' + err.message : ': ')
        message = 'This and all future requests will be directed to the given URL.'
    }else{
        customMessage = 'Movido Permanentemente' + (err.message ? ': ' + err.message : ': ')
        message = 'Esta y todas las peticiones futuras deberían ser dirigidas a la URL dada'
    }
    res.status(301).send({
        status: 301,
        name: 'movedPermanently',
        customMessage: customMessage,
        message: message
    });
}

exports.seeOther = (err, req, res) => {
    let lang = req.headers.lang;
    let customMessage = ''
    let message = ''
    if (lang == 'en'){
        customMessage = 'See Other' + (err.message ? ': ' + err.message : ': ')
        message = 'The response to the request can be found under another URL'
    }else{
        customMessage = 'URL cambiada' + (err.message ? ': ' + err.message : ': ')
        message = 'La respuesta a la petición puede ser encontrada bajo otra URL'
    }

    res.status(303).send({
        status: 303,
        name: 'seeOther',
        customMessage: customMessage,
        message: message
    });
}

exports.notModified = (err, req, res) => {
    let lang = req.headers.lang;
    let customMessage = ''
    let message = ''
    if (lang == 'en'){
        customMessage = 'Not Modified' + (err.message ? ': ' + err.message : ': ')
        message = 'The request to the URL has not been modified since it was last requested'
    }else{
        customMessage = 'No modificada' + (err.message ? ': ' + err.message : ': ')
        message = 'La petición a la URL no ha sido modificada desde que fue requerida por última vez'
    }

    res.status(304).send({
        status: 304,
        name: 'notModified',
        customMessage: customMessage,
        message: message
    });
}

exports.temporaryRedirect = (err, req, res) => {
    let lang = req.headers.lang;
    let customMessage = ''
    let message = ''
    if (lang == 'en'){
        customMessage = 'Temporary Redirect' + (err.message ? ': ' + err.message : ': ')
        message = 'The request must have been made with another URL, however it can still be processed with the URL provided'
    }else{
        customMessage = 'Redirección Temporal' + (err.message ? ': ' + err.message : ': ')
        message = 'La peticion debío haber sido hecha con otra URI, sin embargo aún puede ser procesada con la URL proporcionada'
    }

    res.status(307).send({
        status: 307,
        name: 'temporaryRedirect',
        customMessage: customMessage,
        message: message
    });
}

exports.permanentRedirect = (err, req, res) => {
    let lang = req.headers.lang;
    let customMessage = ''
    let message = ''
    if (lang == 'en'){
        customMessage = 'Permanent Redirect' + (err.message ? ': ' + err.message : ''),
        message = 'The resource requested by the browser is located elsewhere and this change is permanent'
    }else{
        customMessage = 'Redireccionamiento permanente' + (err.message ? ': ' + err.message : ''),
        message = 'El recurso solicitado por el navegador se encuentra en otro lugar y este cambio es permanente'
    }

    res.status(308).send({
        status: 308,
        name: 'permanentRedirect',
        customMessage: customMessage,
        message: message
    });
}

// 4xx Errores del cliente =================================================
//La solicitud contiene sintaxis incorrecta o no puede procesarse.
exports.badRequest = (err, req, res) => {
    let lang = req.headers.lang;
    let customMessage = ''
    let message = ''
    if (lang == 'en'){
        customMessage = 'Bad Request' + (err.message ? ': ' + err.message : ''),
        message = 'The request could not be understood by the server due to malformed syntax'
    }else{
        customMessage = 'Solicitud Erronea' + (err.message ? ': ' + err.message : ''),
        message = 'El servidor no pudo entender la solicitud'
    }

    res.status(400).send({
        status: 400,
        name: 'badRequest',
        customMessage: customMessage,
        message: message
    });
}

exports.unautorized = (err, req, res) => {
    let lang = req.headers.lang;
    let customMessage = ''
    let message = ''
    if (lang == 'en'){
        customMessage = 'Unautorized' + (err.message ? ': ' + err.message : ''),
        message = 'Authentication is possible but has failed or has not yet been provided'
    }else{
        customMessage = 'No Autorizado' + (err.message ? ': ' + err.message : ''),
        message = 'La autenticación es posible pero ha fallado o aún no ha sido provista'
    }

    res.status(401).send({
        status: 401,
        name: 'unautorized',
        customMessage: customMessage,
        message: message
    });
}

exports.forbidden = (err, req, res) => {
    let lang = req.headers.lang;
    let customMessage = ''
    let message = ''
    if (lang == 'en'){
        customMessage = 'Forbidden' + (err.message ? ': ' + err.message : ''),
        message = 'The server understood the request, but is refusing to fulfill it. Authorization will not help and the request SHOULD NOT be repeated.'
    }else{
        customMessage = 'Prohibido' + (err.message ? ': ' + err.message : ''),
        message = 'No se tienen los permisos necesarios'
    }

    res.status(403).send({
        status: 403,
        name: 'forbidden',
        customMessage: customMessage,
        message: message
    });
}

exports.notFound = (err, req, res) => {
    let lang = req.headers.lang;
    let customMessage = ''
    let message = ''
    if (lang == 'en'){
        customMessage = 'Not Found' + (err.message ? ': ' + err.message : ''),
        message = 'The server has not found anything matching the Request-URI'
    }else{
        customMessage = 'Recurso no encontrado' + (err.message ? ': ' + err.message : ''),
        message = 'Recurso no encontrado'
    }

    res.status(404).send({
        status: 404,
        name: 'notFound',
        customMessage: customMessage,
        message:message
    });
}

exports.methodNotAllowed = (err, req, res) => {
    let lang = req.headers.lang;
    let customMessage = ''
    let message = ''
    if (lang == 'en'){
        customMessage = 'Method Not Allowed' + (err.message ? ': ' + err.message : ''),
        message = 'The method specified in the Request-Line is not allowed for the resource identified by the Request-URI.'
    }else{
        customMessage = 'Método no permitido' + (err.message ? ': ' + err.message : ''),
        message = 'La petición fue hecha a una URI utilizando un método de solicitud no soportado por dicha URL; por ejemplo, cuando se utiliza GET en un formulario que requiere que los datos sean presentados vía POST, o utilizando PUT en un recurso de solo lectura'
    }

    res.status(405).send({
        status: 405,
        name: 'methodNotAllowed',
        customMessage: customMessage,
        message: message
    });
}

exports.conflict = (err, req, res) => {
    let lang = req.headers.lang;
    let customMessage = ''
    let message = ''
    if (lang == 'en'){
        customMessage = 'Conflict' + (err.message ? ': ' + err.message : ''),
        message = 'The request could not be completed due to a conflict with the current state of the resource'
    }else{
        customMessage = 'Conflicto' + (err.message ? ': ' + err.message : ''),
        message = 'Conflicto con el estado actual del recurso'
    }

    res.status(409).send({
        status: 409,
        name: 'Conflict',
        customMessage: customMessage,
        message: message
    });
}

exports.validationFailed = (err, req, res) => {
    let lang = req.headers.lang;
    let customMessage = ''
    let message = ''
    if (lang == 'en'){
        customMessage = 'Validation failed' + (err.message ? ': ' + err.message : ''),
        message = 'There were some errors in the body'
    }else{
        customMessage = 'Fallo de validacion' + (err.message ? ': ' + err.message : ''),
        message = 'Hubieron errores en el cuerpo de la petición'
    }

    res.status(412).send({
        status: 412,
        name: 'validationFailed',
        customMessage: customMessage,
        message: message,
        data: err.errors,
    });
}

exports.unsupportedMediaType = (err, req, res) => {
    let lang = req.headers.lang;
    let customMessage = ''
    let message = ''
    if (lang == 'en'){
        customMessage = 'Unsupported Media Type' + (err.message ? ': ' + err.message : ''),
        message = 'The server is refusing to service the request because the entity of the request is in a format not supported by the requested resource for the requested method.'
    }else{
        customMessage = 'Tipo de medio no compatible' + (err.message ? ': ' + err.message : ''),
        message = 'La petición del navegador tiene un formato que no entiende el servidor y por eso no se procesa'
    }

    res.status(415).send({
        status: 415,
        name: 'unsupportedMediaType',
        customMessage: customMessage,
        message: message
    });
}

exports.imATeapot = (err, req, res) => {
    let lang = req.headers.lang;
    let customMessage = ''
    let message = ''
    if (lang == 'en'){
        customMessage = 'I am a teapot' + (err.message ? ': ' + err.message : ''),
        message = 'This code was defined in 1998 as one of the traditional IETF April Fools'
    }else{
        customMessage = 'Soy Una tetera' + (err.message ? ': ' + err.message : ''),
        message = 'Soy una tetera'
    }

    res.status(418).send({
        status: 418,
        name: 'imATeapot',
        customMessage: customMessage,
        message: message
    });
}


// 5xx Errores de servidor =================================================
//El servidor falló al completar una solicitud aparentemente válida.
exports.internal = (err, req, res) => {
    let lang = req.headers.lang;
    let customMessage = ''
    let message = ''
    if (lang == 'en'){
        customMessage = 'Internal Server Error' + (err.message ? ': ' + err.message : ''),
        message = 'The server encountered an unexpected condition which prevented it from fulfilling the request'
    }else{
        customMessage = 'Error de servidor interno' + (err.message ? ': ' + err.message : ''),
        message = 'Error Interno en el Servidor'
    }

    res.status(500).send({
        status: 500,
        name: 'internalServerError',
        customMessage: customMessage,
        message: message
    });
}

exports.notImplemented = (err, req, res) => {
    let lang = req.headers.lang;
    let customMessage = ''
    let message = ''
    if (lang == 'en'){
        customMessage = 'Not Implemented' + (err.message ? ': ' + err.message : ''),
        message = 'The server does not support the functionality required to fulfill the request'
    }else{
        customMessage = 'No Implementado' + (err.message ? ': ' + err.message : ''),
        message = 'El servidor no soporta alguna funcionalidad necesaria para responder a la solicitud del navegador (como por ejemplo el método utilizado para la petición)'
    }

    res.status(501).send({
        status: 501,
        name: 'notImplemented',
        customMessage: customMessage,
        message: message
    });
}

exports.badGateway = (err, req, res) => {
    let lang = req.headers.lang;
    let customMessage = ''
    let message = ''
    if (lang == 'en'){
        customMessage = 'Bad Gateway' + (err.message ? ': ' + err.message : ''),
        message = 'The server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in attempting to fulfill the request'
    }else{
        customMessage = 'Bad Gateway' + (err.message ? ': ' + err.message : ''),
        message = 'El servidor ha recibido una respuesta inválida de otro servidor'
    }

    res.status(502).send({
        status: 502,
        name: 'badGateway',
        customMessage: customMessage,
        message: message
    });
}

exports.serviceUnavailable = (err, req, res) => {
    let lang = req.headers.lang;
    let customMessage = ''
    let message = ''
    if (lang == 'en'){
        customMessage = 'Service Unavailable' + (err.message ? ': ' + err.message : ''),
        message = 'The server is currently unable to handle the request due to a temporary overloading or maintenance of the server.'
    }else{
        customMessage = 'Service No Disponible' + (err.message ? ': ' + err.message : ''),
        message = 'El servidor no puede responder a la petición del navegador porque está congestionado o está realizando tareas de mantenimiento'
    }

    res.status(503).send({
        status: 503,
        name: 'serviceUnavailable',
        customMessage: customMessage,
        message: message
    });
}

exports.gatewayTimeout = (err, req, res) => {
    let lang = req.headers.lang;
    let customMessage = ''
    let message = ''
    if (lang == 'en'){
        customMessage = 'Gateway Timeout' + (err.message ? ': ' + err.message : ''),
        message = 'The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server specified by the URI'
    }else{
        customMessage = 'Gateway Timeout' + (err.message ? ': ' + err.message : ''),
        message = 'El servidor está actuando de proxy o gateway y no ha recibido a tiempo una respuesta del otro servidor, por lo que no puede responder adecuadamente a la petición del navegador'
    }

    res.status(504).send({
        status: 504,
        name: 'serviceUnavailable',
        customMessage: customMessage,
        message: message
    });
}

exports.insufficientStorage = (err, req, res) => {
    let lang = req.headers.lang;
    let customMessage = ''
    let message = ''
    if (lang == 'en'){
        customMessage = 'Gateway Timeout' + (err.message ? ': ' + err.message : ''),
        message = 'The 507 (Insufficient Storage) status code means the method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request'
    }else{
        customMessage = 'Espacio insuficiente' + (err.message ? ': ' + err.message : ''),
        message = 'El servidor no puede crear o modificar el recurso solicitado porque no hay suficiente espacio de almacenamiento libre'
    }

    res.status(507).send({
        status: 507,
        name: 'insufficientStorage',
        customMessage: customMessage,
        message: message
    });
}
