var restify = require('restify');
var pdfFillForm = require('pdf-fill-form');
var fs = require('fs');
const path = 'resources/pdfs/';

const fillForm = (req, res, next) => {
    const filename = path + 'i-129';
    const fields = req.body;
    fieldFiller(fields, filename, (result )=>{
        res.send(result);
        next();
    });
    
}

const fieldFiller = (fields, fullPath, callback) => {
    let firstLoop = true;
    fields.map(field => {
        let filledField = {};
        filledField[field.id] = field.value;
        let pdf = pdfFillForm.writeSync(fullPath + '.pdf', filledField, { 'save': 'pdf' });
        if (firstLoop) {
            fullPath = fullPath + '_filled';
            firstLoop = false;
        }
        fs.writeFileSync(fullPath + '.pdf', pdf);
        console.info(filledField);
    });
    callback(fullPath);
}

const loadPdf = fullPath => pdfFillForm.readSync(fullPath + '.pdf');

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

server.post('/pdf/:filename/fields', fillForm);

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});