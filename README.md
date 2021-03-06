# pdf-filler-restify

PDF Form filler using a web service

## Features

* GET the field attributes of a **pdf form** in a convenient JSON Format.
* POST the form fields with the values you need and generate a *filled pdf file*
* Dynamic pdf loading via route, for example http://localhost/pdf/myPdfFile/fields

## Super quick start, test drive

You can try this application using Docker CE.

Requirements: docker

```
$ docker run --rm -it -p 8888:8080 ratacibernetica/pdf-filler-restify
```

### Test it 

On linux/Mac, visit localhost:8888/pdf/i-129/fields

On Windows, open Kitematic, select the running container, click settings tab and lock for the correct ip address and port.

## Quick start 

Clone this repo:

```
$ git clone git@github.com:ratacibernetica/pdf-filler-restify.git
```

Get it up and running (for docker users):

```
$ cd pdf-filler-restify
$ docker run --rm -it -v "$PWD:/app" -w "/app" -p 8080:8080 ratacibernetica/debian-node npm install && npm start
```

Make a GET request to the URL localhost:8080/pdf/**THE-FILE-NAME**/fields. 

For the demo file i-129.pdf the URL is localhost:8080/pdf/**i-129**/fields:

![](http://res.cloudinary.com/ratacibernetica/image/upload/v1492568096/Screen_Shot_2017-04-18_at_10.11.52_PM_jbf92f.png)

POST a JSON object with the desired changes:

Example of object:

```
{
	"pdfFile": "i-129",
	"filename": "myNewFile",
	"content": {
		"65537": "Martín",
		"65538": "Roldán Araujo",
		"65539": "Across Borders Management Consulting Group",
		"65540": "Mount Dora",
		"65541": 32757,
		"65549": "777777777",
		"65542": "FL"
	}
}
```

Where:

**pdfFile** the name of the PDF template form that should exist in resources/pdfs
**filename** the *desired* name for the filled pdf file.
**content** object with the id of the fields and the value of each one.

![](http://res.cloudinary.com/ratacibernetica/image/upload/v1493087370/Screen_Shot_2017-04-24_at_10.28.31_PM_xgzgut.png)

## Changing the app settings.

If you want to set another path for PDFs or change the name of the server, simply change those in the `src/loader/pdf-loader.js` file:

```
const path = process.env.PWD + '/resources/pdfs/';
const serverName = "http://182.72.238.124:8080";
```

**path** shoud be an absolute path in the system the app is running.
**serverName** it will be in the response of the generated file, so you can download it.

## Running as daemon

Just run with `npm start &` and it will be running in the background.

## Requirements

This utility requires `libcairo2-dev libpoppler-qt5-dev curl` and node > v4.5 to work.

Note: do yourself a favor, use docker.

```
$ docker run --rm -it -v "$PWD:/app" -w "/app" -p 8080:8080 ratacibernetica/debian-node bash
```


