# demo-nodejs-dynamodb-serverless
Proyecto que realiza la invocación la API de mensajes público [yesno.wtf](https://yesno.wtf/) y lo persiste en una tabla de DynamoDB en un entorno local mediante 2 opciones : localstack y serverless-dynamodb-local

>Stack Tecnológico :
>* Node.js (https://nodejs.org)
>* Serverless Framework (https://serverless.com/)
>* DynamoDB (https://aws.amazon.com/es/dynamodb/)
>* LocalStack (https://github.com/localstack/localstack)

## Prerrequisitos

Instalar las siguientes herramientas y frameworks:
* Node.js 8.10 o superior
* Docker
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

Específicos

* Preparar y Configurar un proyecto genérica (Documento **git:vjmadrid/enmilocalfunciona-aprendiendo-serverless/doc/README-preparar-configurar-proyecto.md**)

Este proyecto sigue los pasos básicos de construcción

1. Creación de un directorio para el proyecto : **demo-nodejs-dynamodb-serverless**
2. Ubicarse dentro de este directorio
3. Ejecutar el comando de creación de un arquetipo básico 

```bash
npm init -y
```

4. Verificar la existencia del fichero package.json

NOTA : No aplicar más pasos del documento

``` js
{
  "name": "demo-nodejs-dynamodb-serverless",
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

## 2.3 Instalación de dependencias iniciales 

Instalar las siguientes dependencias :

* **[request](https://www.npmjs.com/package/request)** : Cliente de peticiones HTTP

* **[boom](https://www.npmjs.com/package/boom)** : Gestiona de forma amigable los errores HTTP

* **[aws-sdk](https://www.npmjs.com/package/aws-sdk)** : AWS SDK para Javascript

* **[uuid](https://www.npmjs.com/package/uuid)** : Generación de RFC4122

* **[cross-env](https://www.npmjs.com/package/cross-env)** : Facilita trabajar con variables de entorno en diferentes plataformas

Añadir al fichero 'package.json':

``` js
"dependencies": {
    "request": "^2.88.0",
    "boom": "^7.3.0",
    "aws-sdk": "^2.12.0",
    "uuid": "^2.0.3"
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

``` bash
$ npm run clean
```

## Instalar y Configurar Serverless Framework

* Instalar y Configurar Serverless Framework (Documento **git:vjmadrid/enmilocalfunciona-aprendiendo-serverless/doc/README-instalacion-configuracion-serverless.md**)


## Preparar y Configurar el entorno "local"

En este apartado se detallaran los pasoos, herramientas y procedimientoa para poder trabajar con serverless en un entorno local

* Instalar el plugin serverless-offline
* Instalar y configurar LocalStack
* Instalar el plugin serverless-dynamodb-local


### Instalar el plugin serverless-offline

* Instalar y Configurar serverless-Offline (Documento **git:vjmadrid/enmilocalfunciona-aprendiendo-serverless/doc/README-instalacion-configuracion-serverless-offline.md**)


### Instalar y configurar LocalStack

* Instalar y Configurar LocalStack (Documento **git:vjmadrid/enmilocalfunciona-aprendiendo-serverless/doc/README-instalacion-configuracion-localstack.md**)

* Crear fichero .env (con la declaración de los servicios en la localización de localstack)	

SERVICES=sqs,dynamodb

* Arrancar el proyecto
	
	cd localstack


### Instalar el plugin serverless-dynamodb-local

* Instalar y Configurar Serverless-Offline (Documento **git:vjmadrid/enmilocalfunciona-aprendiendo-serverless/doc/README-instalacion-configuracion-serverless-dynamodb-local.md**)





## Implementar el proyecto

### Estructura

Todo el código se ubica en el directorio : src/

**Directorios** 

* **src/common/** : Aspectos comunes a todos los manejadores
* **connector/:** Aspectos relacionados con la comunicación de la función con otros sistemas
* **src/connector/dynamodb:** Aspectos relacionados con el desarrollo y control de la instancia de dynamodb
* **messages/** : Aspectos relacionados con el objeto de negocio de mensajes. En este caso proporciona todo lo necesario para que su contenido sea la respuesta al invocación al API [yesno.wtf](https://yesno.wtf/)



**Manejadores** 

* **message.handler.create.js** : Manejador de creación del mensaje (invoca al API externo y lo persiste en la dynamoDB)
* **message.handler.delete.all.js** : Manejador de borrado de todos los mensajes de la tabla de dynamodb
* **message.handler.delete.js** : Manejador de borrado especifico de mensajes de la tabla de dynamodb
* **message.handler.list.js** : Manejador de listado de todos los mensajes de la tabla de dynamodb

> Los manejadores se han diseñado pensando en dos enfoques CON y sin la utilización de una capa de servicio encargada de la gestión y operativa contra dynamodb


## Configuración del Conector Nodejs para Dynamodb

Existe una pieza en el proyecto encargada de realizar las operativas con la base de datos Dynamodb : src/connector/dynamodb

Se aconseja modificar los parametros para la conexión 
de los fichero

**demo-nodejs-dynamodb-serverless/src/connector/dynamodb/dynamodb.connector.constant.js**

En este fichero se ubican los detalles de conexión (parámetos, puertos, etc.) de cada uno de los elementos de mocking

Se han establecido variables de entorno para facilitar su configuración

Por defecto esta definido el uso de : LocalStack

**demo-nodejs-dynamodb-serverless/src/connector/dynamodb/dynamodb.connector.config.js**

En este fichero se ubican los detalles de configuración ( de cada una de los elementos de mocking en base a constantes, variables de entorno y valores pod defecto

* Variable entorno CONFIG_LOCAL_DYNAMODB : Modo de ejecución en local ("LOCALSTACK" | "DYNAMODB_LOCAL")
  * Valor por defecto : "LOCALSTACK"
* Variable de entorno DYNAMODB_TABLE : Nombre de la tabla con la que trabajar
  * Valor por defecto : "example-table"

Se han establecido variables de entorno para facilitar su configuración

### Ejecutar el Proyecto


Ejecutar la tarea "start"

``` bash
$ npm run start
```

Se debería e ver algo como esto
``` bash
cross-env-shell NODE_ENV=local "sls offline start"

Dynamodb Local Started, Visit: http://localhost:8000/shell
Serverless: DynamoDB - created table example-table
Serverless: Starting Offline: undefined/undefined.

Serverless: Routes for list:
Serverless: GET /message

Serverless: Routes for listService:
Serverless: GET /message/service

Serverless: Routes for create:
Serverless: POST /message

Serverless: Routes for createService:
Serverless: POST /message/service

Serverless: Routes for delete:
Serverless: DELETE /message/{id}

Serverless: Routes for deleteService:
Serverless: DELETE /message/service/{id}

Serverless: Routes for deleteAll:
Serverless: DELETE /message

Serverless: Routes for deleteAllService:
Serverless: DELETE /message/service

Serverless: Offline listening on http://localhost:3000
```

El proyecto quedaría listo para usarse


### Probar REST

Se puede ejecutar algo como lo siguiente :

POST http://localhost:3000/message

Se puede observar una respuesta como la siguiente
``` bash
{
    "status": "create",
    "message": {
        "answer": "yes",
        "forced": false,
        "image": "https://yesno.wtf/assets/yes/5-64c2804cc48057b94fd0b3eaf323d92c.gif"
    }
}
```
Revisar tambien los logs de la consola

GET http://localhost:3000/message

Se puede observar una respuesta como la siguiente
``` bash
[
    {
        "checked": false,
        "createdAt": 1550233677704,
        "id": "204a1790-311d-11e9-bee5-5d239e4f8964",
        "text": {
            "answer": "yes",
            "image": "https://yesno.wtf/assets/yes/5-64c2804cc48057b94fd0b3eaf323d92c.gif",
            "forced": false
        },
        "updatedAt": 1550233677704
    }
]
```
Revisar tambien los logs de la consola

DELETE http://localhost:3000/message/204a1790-311d-11e9-bee5-5d239e4f8964

Se puede observar una respuesta como la siguiente
``` bash
"{ id : 204a1790-311d-11e9-bee5-5d239e4f8964}"
```

DELETE http://localhost:3000/message/delete

Se puede observar una respuesta como la siguiente
``` bash
{
    "messages_deleted": "{}"
}
```
Donde se mostraría una lista con los mensajes borrados

Revisar tambien los logs de la consola

### Probar con Invoke Local

Se puede ejecutar algo como lo siguiente :

POST http://localhost:3000/message

Se puede observar una respuesta como la siguiente

serverless invoke local --function hello

Y la respuesta será como la siguiente por conola

``` bash
info [HANDLER] hello...
info [*] IS_OFFLINE : undefined
{
    "statusCode": 200,
    "body": "{\"params_body\":{\"message\":\"Hello World!20:21:59 GMT+0100 (Hora estándar romance)\",\"validate\":false}}"
}
```

Esta vez los logs no aparecerán por la consola
