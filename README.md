# pdf-filler-restify

PDF Form filler using a web service

## Features

* GET the field attributes of a **pdf form** in a convenient JSON Format.
* POST the form fields with the values you need and generate a *filled pdf file*
* Dynamic pdf loading via route, for example http://localhost/pdf/myPdfFile/fields

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
![](http://res.cloudinary.com/ratacibernetica/image/upload/v1492568096/Screen_Shot_2017-04-18_at_10.12.10_PM_jmsokk.png)

## Requirements

This utility requires `libcairo2-dev libpoppler-qt5-dev curl` and node > v4.5 to work.

Note: do yourself a favor, use docker.

```
$ docker run --rm -it -v "$PWD:/app" -w "/app" -p 8080:8080 ratacibernetica/debian-node bash
```


