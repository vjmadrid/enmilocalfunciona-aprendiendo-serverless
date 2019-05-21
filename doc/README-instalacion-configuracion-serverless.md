# Instalar y Configurar Serverless Framework

**Herramienta CLI** Open Source que proporciona **comandos** para **facilitar** ciertas **operativas** a la hora de realizar la construcción, configuración, implementación y despliegue de **funciones serverless**.

https://serverless.com/

Pasos: 

* Verificar Prerrequisitos 
* Instalar Serverless Framework
* Configurar AWS
* Configurar fichero "serverless.yml"

## Verificar Prerrequisitos 

**Instalar Node.js** 

Nota: Serverless se ejecuta en Node v4 o superior
https://nodejs.org/en/download/

Revisar la version 

```bash
node --version
```

## Instalar Serverless Framework

Ejecutar el siguiente comando para instalar el framework

```bash
npm install -g serverless
```

Revisar la version 

```bash
serverless --version
```

En caso de que sea necesario desinstalar algo de serverless 

```bash
serverless uninstall <plugin>
```

###  Instalación de dependencia

* **[serverless](https://www.npmjs.com/package/serverless)** : Instalar la herramienta Serverless

Añadir al fichero 'package.json':

``` js
"devDependencies": {
    ...
    "serverless": "^1.34.1",
    ...
  }
```

Añadir tareas para su uso en el mismo fichero

``` js
"scripts": {
    ...
    "deploy": "sls deploy -v",
    "undeploy": "sls remove"
    ...
  },
```
**deploy** :  realiza un despliegue mediante serverless en la configuración proporcionada en su fichero serverless.yml

``` bash
npm run deploy
```

**undeploy** :  eliminar un despliegue mediante serverless en la configuración proporcionada en su fichero serverless.yml

``` bash
$ npm run undeploy
```

> IMPORTANTE
> 
> Estas operativas se han quitado para asegurar su uso en local

## Configurar AWS

El framework requiere una cuenta AWS
https://serverless.com/framework/docs/providers/aws/guide/credentials/

En mi caso particular tengo el directorio oculto .aws de mi usuario 2 ficheros con la siguiente configuración

El fichero "config"
``` bash
[default]
region = eu-west-1

[profile local]
region = eu-west-1
source_profile = local
```

El fichero "credentials"
``` bash
[default]
aws_access_key_id = 123456
aws_secret_access_key = changeit

[local]
aws_access_key_id = 123456
aws_secret_access_key = changeit
```

## Configurar fichero "serverless.yml"

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
