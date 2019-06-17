# Serverless Framework Meetup - BCN 2019
Monolitos… Entornos virtualizados… microservicios… ¿y ahora serverless? ¿Qué es? ¿Puedo trabajar con ello sin tener que poner una tarjeta de crédito? ¿Qué cambia en nuestra manera de trabajar?

![Evolution of deployment](images/images_chart_evolutionofdeploymentV.png)

Serverless es un tipo de arquitectura donde las máquinas dejan de existir y el código se ejecuta en ambientes suministrados por los distintos proveedores cloud.

Serverless Framework nos simplifica el desarrollo, orquestación y despliegue de los distintos elementos que conforman estas arquitecturas.

## Roadmap
El objetivo es entender cómo funciona serverless framework y cómo nos facilita el desarrollo, testing y despliegue de nuestras arquitecturas serverless.

Este README es una guía paso a paso con la que vamos a generar un proyecto de ejemplo

La práctica solucionada en este repositorio (https://github.com/vjmadrid/enmilocalfunciona-aprendiendo-serverless)


## Requisitos

>IMPORTANTE: 
>* Serverless se ejecuta en Node v4 o superior
>* Nodejs 8.10 es el límite actual de AWS Lambda

### Nodejs
Recomendamos instalar node usando [nvm](https://github.com/creationix/nvm)

* Instalar y Configurar NVM (Node Version Manager) (Documento **git:vjmadrid/enmilocalfunciona-aprendiendo-serverless/doc/README-instalacion-configuracion-nvm.md**)
* Instalar y Configurar Node.js (Documento **git:vjmadrid/enmilocalfunciona-aprendiendo-serverless/doc/README-instalacion-configuracion-node.md**)

### Serverless framework

* Instalar y Configurar Serverless Framework (Documento **git:vjmadrid/enmilocalfunciona-aprendiendo-serverless/doc/README-instalacion-configuracion-serverless.md**)

### Docker

Necesitamos tener instalados instalar [docker](https://docs.docker.com/install/) y 
[docker-compose](https://docs.docker.com/compose/install/)

### AWS cli
Para poder desplegar necesitamos instalar AWS CLI

Pero si se trabaja en local no sera necesario

serverless config credentials --provider aws --key AWS_ACCESS_KEY --secret AWS_SECRET

	https://serverless.com/framework/docs/providers/aws/guide/credentials/

* Desplegar (Pendiente de las credenciales del proveedor cloud)

	serverless deploy		


### GIT
Para poder descargarnos recursos vamos a utilizar [GIT](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)


## Primeros pasos

### Generar un directorio de proyecto (localización)

Vamos a crear un proyecto en una carpeta "serverless-meetup"

``` bash
mkdir serverless-meetup
cd serverless-meetup
```

### Generar una plantilla de proyecto Node

https://docs.npmjs.com/creating-a-package-json-file

Se generará una plantilla de Node con default package.json

``` js
npm init -y
ó
npm init --yes
```

Se pueden verificar que se ha generado el fichero :

* *package.json*

``` js
{
  "name": "serverless-meetup",
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

Añadir al fichero 'package.json' el script "clean"

``` js
"scripts": {
	...
  "clean": "rm -rf package-lock.json && npm install",
  ...
}
```

### Generar una plantilla de proyecto Serverless

Se generará una plantilla de Serverless para node

``` bash
sls create --template aws-nodejs
ó
serverless create --template aws-nodejs --path serverless-meetup
```

Se pueden verificar que se ha generado el fichero :

* *serverless.yml*
* *handler.js*

Modificar el nombre del servicio en el fichero "serverless.yml"

### [TEST 1] Probar en local la invocación al servicio

Probar directamente la función creada usando el método invoke

``` bash
sls invoke local --function hello
``` 

También se pueden pasar un evento específico para realizar estas pruebas

``` bash
sls invoke local --function hello --data {"name":world}
```

Se podría invocar en modo real 

``` bash
sls invoke --f hello
``` 

### Incorporar un desencadenador

En "serverless.yml" se pueden añadir desencadenadores a la función. En este ejemplo añadimos uno de tipo http en la ruta hello (mediante un API Gateway que nos resulta transparente)

``` js
hello:
    handler: handler.hello

    <!-- Add this -->
    events:
      - http:
          path: hello
          method: any
```

[OPCIONAL] Añadir más servicios

* Opciones mismo fichero o diferentes (pensar sobre implicaciones)


### [TEST 2] Probar en local la invocación al servicio con offline

Serverless framework nos permite instalar múltiples plugins, vamos a utilizar uno para la ejecución offline

Instalar el plugin en caso de que sea la primera vez

``` bash
sls plugin install --name serverless-offline
```

En el fichero "serverless.yml" se ha añadido la parte de : provider y la de plugins

En el fichero "package.json" se ha añadido la dependencia en desarrollo "serverless-offline"

Si lanzamos el siguiente comando podremos ver como levanta la lambda como servicio, exponiéndose en nuestro localhost en el puerto 3000
```
sls offline
```

Verificar la información de arranque


Como no hemos especificado ningún verbo podemos hacer estas pruebas para comprobar el evento que recibimos en nuestra función

Podemos probar con Postman o cURL

``` bash
POST localhost:3000/hello?name=world
curl localhost:3000/hello -X POST -d '{"name":"world"}'
o
curl localhost:3000/hello?name=world
```

## Despliegue
Teniendo AWS cli configurado el despliegue (y sus futuras actualizaciones) de nuestras funciones y su API Gateway es tan sencillo como hacer


Se requiere añadir la información asociada a la cuenta oficial

    sls deploy

Podemos ir a la consola de Cloudformation de AWS y comprobar el stack que ha creado y todos sus recursos.

Igual que hemos invocado las lambdas en local podemos hacerlo de manera remota con

    sls invoke --function hello

Finalmente, para eliminar completamente el entorno desplegado basta con hacer

    sls remove

### Empaquetado

Se pueden excluir e incluir ficheros en el paquete que se genera para desplegar.
```
package:
#  include:
#    - include-me.py
#    - include-me-dir/**
  exclude:
    - '*.json'
    - 'init.sh'
    - 'Jenkinsfile'
    - '*.md'
    - 'images/**'
    - 'requeriments.txt'
    - 'env/**'
    - 'node_modules/**'
```

## Autoría

* **Víctor Madrid**

## Fuentes de información

### Arquitecturas serverless
* https://enmilocalfunciona.io/tag/serverless/
* https://aws.amazon.com/es/serverless/
* https://read.acloud.guru/serverless/home

### Serverless en AWS
* https://aws.amazon.com/es/blogs/compute/applying-the-twelve-factor-app-methodology-to-serverless-applications/
* https://aws.amazon.com/es/premiumsupport/knowledge-center/internet-access-lambda-function/
* https://speakerdeck.com/alexcasalboni/advanced-serverless-architectural-patterns-on-aws

### Serverless Framework
* https://serverless.com/framework/docs/providers/aws/guide/intro/
* https://serverless.com/framework/docs/providers/aws/guide/variables/
* https://serverless.com/framework/docs/providers/aws/events/
* https://serverless.com/blog/keep-your-lambdas-warm/
