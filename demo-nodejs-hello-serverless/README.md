# demo-nodejs-hello-serverless
Proyecto que Muestra un mensaje "Hello World" ("Todo un clásico de cualquier desarrollo" :-) ) junto a información del evento que lo desencadeno a través de una petición REST (evento HTTP)

## Stack Tecnológico

* Node.js (https://nodejs.org)
* Serverless Framework (https://serverless.com/)

## Prerrequisitos


Instalar las siguientes herramientas y frameworks:
* Node.js 8.10 o superior
* Editor de código
* Postman

Recomendación de elementos extra a instalar :
* Visual Studio Code: https://code.visualstudio.com/
* nvm: https://github.com/creationix/nvm
* npm: https://www.npmjs.com/ (ver. 6.5.0)

## Instalación

Generales Nodejs

>IMPORTANTE: 
>* Serverless se ejecuta en Node v4 o superior
>* Nodejs 8.10 es el límite actual de AWS Lambda

* Instalar y Configurar Node.js (Documento **git:vjmadrid/enmilocalfunciona-aprendiendo-serverless/doc/README-instalacion-configuracion-node.md**)
* Instalar y Configurar NVM (Documento **git:vjmadrid/enmilocalfunciona-aprendiendo-serverless/doc/README-instalacion-configuracion-nvm.md**)

Generales

* Instalar y Configurar Serverless Framework (Documento **git:vjmadrid/enmilocalfunciona-aprendiendo-serverless/doc/README-instalacion-configuracion-serverless.md**)
* Instalar y Configurar Serverless-Offline (Documento **git:vjmadrid/enmilocalfunciona-aprendiendo-serverless/doc/README-instalacion-configuracion-serverless-offline.md**)

Específicos

* Preparar y Configurar un proyecto genérica (Documento **git:vjmadrid/enmilocalfunciona-aprendiendo-serverless/doc/README-preparar-configurar-proyecto.md**)

Este proyecto sigue los pasos básicos de construcción

1. Creación de un directorio para el proyecto : **demo-nodejs-hello-serverless**
2. Ubicarse dentro de este directorio
3. Ejecutar el comando de creación de un arquetipo básico 

```bash
npm init -y
```

4. Verificar la existencia del fichero package.json


``` js
{
  "name": "demo-nodejs-hello-serverless",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

5. Crear directorios tipo (opcional)

* "src" : para incluir el código fuente



## Preparación del proyecto 

### Definición de tareas iniciales del proyecto

Añadir al fichero 'package.json':

``` js
"scripts": {
    "clean": "rm -rf package-lock.json .serverless/ && npm install",
    "node:version": "echo 'nodejs version: ' && node -v "
  },
```

Tareas :

**clean** :  Clean y install del proyecto:

``` bash
$ npm run clean
```
Verificar que se genera el fichero "package-lock.json" y el directorio "node_modules"


**node:version** : Validación de versión de node con la que trabajar

``` bash
$ npm run node:version
```

### Instalar y Configurar Serverless Framework

Seguir el documento **workspace-serverless-framework-lab/doc/README-instalacion-configuracion-serverless.md**


#### Configurar fichero "serverless.yml"

El cliente Serverless funciona a partir de la existencia de un fichero serverless.yml que contien la configuración de las operativas que utilizará.

Se ubica en el directorio raiz del proyecto y tiene un formato como el siguiente :

serverless.yml
```js
service: 
  name: demo-nodejs-hello-serverless

custom:
  serverless-offline:
    port: 3000

provider:
  name: aws
  runtime: nodejs8.10

functions:
  ...

```

### Instalar y Configurar Serverless Offline

Seguir el documento **workspace-serverless-framework-lab/doc/README-instalacion-configuracion-serverless-offline.md**



### Creación del proyecto

Se tiene que crear una clase manejadora (por ejemplo : handler.js) y una función de invocación que contenga la estructura de parametros : event, context, callback

Por ejemplo : 
``` js
'use strict';

const IS_OFFLINE = eval(process.env.IS_OFFLINE);

exports.hello = (event, context, callback) => {
    console.log('info', '[HANDLER] hello...' );
    console.log('info', '[*] IS_OFFLINE : '+ IS_OFFLINE);

    const params_body = {
        message: "Hello World!" + new Date().toTimeString(), 
        method: event.httpMethod,
        url: event.path,
        payload: event.body,
        headers: event.headers,
        validate: false
    };

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            params_body
        }),
      };
    
    callback(null, response);
};
```


En este manejador se pinta información con detalle del tipo de evento que se esta ejecutando en el manejador , el mensaje de "Hello World con la hora de invocación" y se devuelve como petición REST 200.

Además se esta mostrando el valor de la variable de entorno que indica que se esta ejecutando en modo OFFLINE (IS_OFFLINE)


Posteriormente mapear su invocación en el fichero : serverless.yml

```js
service: 
  name: demo-nodejs-hello-serverless

...

functions:
  api:
    handler: src/handler.hello
    events:
      - http:
          path: "{proxy+}"
          method: any
          cors: true
   
  hello:
    handler: src/handler.hello
    events:
      - http:
          path: hello
          method: get    

```

### Ejecutar el proyecto

En caso de que no se haya hecho todavía ejecutar las dependencias : **npm run clean**

### Arrancar el proyecto

Ejecutar la tarea "start"

``` bash
$ npm run start
```

Se debería e ver algo como esto
``` bash
cross-env-shell NODE_ENV=local "sls offline start"

Serverless: Starting Offline: undefined/undefined.

Serverless: Routes for api:
Serverless: ANY /{proxy*}

Serverless: Routes for hello:
Serverless: GET /hello

Serverless: Offline listening on http://localhost:3000
```

El proyecto quedaría listo para usarse

### Ejemplo Práctico : "Hello World!"

Se puede ejecutar algo como lo siguiente
http://localhost:3000/ping

Entra por la opción "api"

o

http://localhost:3000/hello

Entra por la opción "hello"

Se puede observar una respuesta como la siguiente
``` js
{
    "params_body": {
        "message": "Hello World!13:18:46 GMT+0100 (Hora estándar romance)",
        "method": "GET",
        "url": "/hello",
        "payload": null,
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
            "Postman-Token": "41c9e148-a934-4faf-a06b-5477926960cc",
            "User-Agent": "PostmanRuntime/7.6.0",
            "Accept": "*/*",
            "Host": "localhost:3000",
            "accept-encoding": "gzip, deflate",
            "Connection": "keep-alive"
        },
        "validate": false
    }
}
```

Revisar tambien los logs de la consola