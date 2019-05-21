# Instalar y Configurar serverless-offline

**Plugin de Serverless** que facilita disponer de un entorno de desarrollo local para utilizar el framework

https://serverless.com/

En este apartado se detallaran los pasoos, herramientas y procedimientoa para poder trabajar con serverless en un entorno local

Pasos: 

* Verificar Prerrequisitos 
* Instalar Serverless Framework

## Verificar Prerrequisitos 

* Verificar la versión de Nodejs

Revisar la version 

```bash
node --version
```

* Verificar la versión de Serverless Framework

Revisar la version 

```bash
serverless --version
```

## Instalar el plugin serverless-offline

* **[serverless-offline](https://www.npmjs.com/search?q=serverless-offline)** : Emula AWS λ y API Gateway localmente 

Instalar el plugin en el directorio del proyecto

```
npm install serverless-offline --save-dev
```

Se habría tenido que añadir la dependencia al fichero 'package.json':

Ejemplo de versión del plugin
``` js
"devDependencies": {
    ...
    "serverless-offline": "^3.25.17",
    ...
  }
```

Posteriormente se puede revisar la instalación 

```
serverless offline --help
o
sls offline --help
o
serverless
```

## Configuración del proyecto para arrancar serverless-offline


Añadir tareas para su uso en el mismo fichero

``` js
"scripts": {
    ...
    "start": "sls offline start",
    ...
  },
```
**start** :  establece el entorno local de ejecución y arranca serverless en modo offline

``` bash
npm run start
```


Añadir la referencia al fichero serverless
``` bash
plugins:
  - serverless-offline #serverless-offline needs to be last in the list
```
