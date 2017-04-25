var restify = require('restify');
var pdfFillForm = require('pdf-fill-form');
var fs = require('fs');
const path = 'resources/pdfs/';

const fillForm = (req, res, next) => {
    const filename = path + 'i-129';
    const fieldsObj = req.body;
    fieldFiller(fieldsObj, filename, (result) => {
        res.send(result);
        next();
    });

}

const fieldFiller = (fieldsObj, fullPath, callback) => {
    let pdf = pdfFillForm.writeSync(fullPath + '.pdf', fieldsObj, { 'save': 'pdf' });
    fs.writeFileSync(fullPath + '_filled.pdf', pdf);
    console.info(fieldsObj);
    callback(fullPath+"_filled.pdf");
}

const loadPdf = fullPath => pdfFillForm.readSync(fullPath + '.pdf');

const getFile = ( req, res, next ) => {
        restify.serveStatic({
        'directory': '/pdf/',
        'default': req.params.filename
    })
}

const getFields = (req, res, next) => {
    let fields = loadPdf(path + req.params.filename);
    if (!fields) {
        fields = { "message": "file not found" };
    }
    let response = {
        "totalFields": fields.length,
        "fields": fields
    };
    res.setHeader('content-type', 'application/json');
    res.send(response);
    next();
}

var server = restify.createServer();
server.use(restify.bodyParser());

server.get('/pdf/:filename/fields', getFields);
server.get('/pdf/:filename', getFile);
server.post('/pdf/:filename/fields', fillForm);

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});