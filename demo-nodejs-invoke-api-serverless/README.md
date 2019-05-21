# demo-nodejs-invoke-api-serverless
Proyecto que ejecuta un servicio de invocación REST a la API de mensajes públicos [yesno.wtf](https://yesno.wtf/) y muestra su mensaje en un respuesta REST

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

1. Creación de un directorio para el proyecto : **demo-nodejs-invoke-api-serverless**
2. Ubicarse dentro de este directorio
3. Ejecutar el comando de creación de un arquetipo básico 

```bash
npm init -y
```

4. Verificar la existencia del fichero package.json

NOTA : No aplicar más pasos del documento

``` js
{
  "name": "demo-nodejs-invoke-api-serverless",
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

### Instalación de dependencias iniciales 

Instalar las siguientes dependencias :

* **[request](https://www.npmjs.com/package/request)** : Cliente de peticiones HTTP

* **[boom](https://www.npmjs.com/package/boom)** : Gestiona de forma amigable los errores HTTP

* **[cross-env](https://www.npmjs.com/package/cross-env)** : Facilita trabajar con variables de entorno en diferentes plataformas

Añadir al fichero 'package.json':

``` js
"dependencies": {
    "request": "^2.88.0",
    "boom": "^7.3.0"
  },
"devDependencies": {
    "cross-env": "5.2.0"
  } 
```

Añadir la tarea 'package.json':

``` js
"scripts": {
  ...
    "profile:local": "cross-env-shell NODE_ENV=local",
  ...
  },
```
**profile:local** :  Permite crear/sobreescribir una variable de entorno con el valor indicado

En este caso facilitaría ciertas configuración para el entorno "local"

``` bash
$ npm run profile:local
```

Por último ejecutar la carga de las dependencias añadidas

```bash
$ npm run clean
```

### Instalar y Configurar Serverless Framework

Seguir el documento **workspace-serverless-framework-lab/doc/README-instalacion-configuracion-serverless.md**

#### Configurar fichero "serverless.yml"

El cliente Serverless funciona a partir de la existencia de un fichero serverless.yml que contien la configuración de las operativas que utilizará.

Se ubica en el directorio raiz del proyecto y tiene un formato como el siguiente :

serverless.yml
```js
service: 
  name: demo-nodejs-invoke-api-serverless

custom:
  serverless-offline:
    port: 3000

provider:
  name: aws
  runtime: nodejs8.10

functions:
  createMessage:
    handler: src/message.handler.createMessage
    events:
      - http:
          path: message
          method: get                

plugins:
  - serverless-offline
```

### Instalar y Configurar Serverless Offline

Seguir el documento **workspace-serverless-framework-lab/doc/README-instalacion-configuracion-serverless-offline.md**


### Creación del proyecto

Se tiene que crear una clase manejadora (por ejemplo : mensaje.handler.js) y una función de invocación que contenga la estructura de parametros : event, context, callback

Por ejemplo : 
``` js
'use strict';
//Imports
const Boom = require('boom');

const MessageService = require('./message/message.service').MessageService;

//Attributes
let messageService = new MessageService();

//Handler Function
module.exports.createMessage = (event, context, callback) => {
  console.log('info', '[HANDLER] [MESSAGE] createMessage ...');

  messageService.generate(event.body)
  .then((message)=> {
      
    const response = {
        statusCode: 200,
        body: JSON.stringify(message),
    };
    
    callback(null, response);
  })
  .catch((err) => {
      console.log('info', 'ERROR' );
      throw Boom.badRequest(err);
  });
};
```
Posteriormente mapear su invocación en el fichero : serverless.yml

```js
service: 
  name: demo-nodejs-invoke-api-serverless

...

functions:
  createMessage:
    handler: src/message.handler.createMessage
    events:
      - http:
          path: message
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

Serverless: Routes for createMessage:
Serverless: GET /message

Serverless: Offline listening on http://localhost:3000
```

El proyecto quedaría listo para usarse


### Ejemplo Práctio : "Invocar a una API Externa"

Para ello se ha creado un modulo de gestión de mensajes en : src/messages donde se proporciona un servicio de invocación REST a la api de mensajes públicos [yesno.wtf](https://yesno.wtf/) devolviendo la respuesta

Se puede ejecutar algo como lo siguiente
GET http://localhost:3000/message

Y se recibe una respuesta como la siguiente

``` js
"{\"answer\":\"yes\",\"forced\":false,\"image\":\"https://yesno.wtf/assets/yes/13-c3082a998e7758be8e582276f35d1336.gif\"}"
```

Revisar tambien los logs de la consola