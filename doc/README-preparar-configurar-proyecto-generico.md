# Preparar y Configurar el proyecto

Pasos: 

* Creación de un proyecto nuevo 
* Definición de tareas iniciales del proyecto
* Instalación de dependencias iniciales

## Definición de tareas iniciales del proyecto

Crear y seleccionar un directorio de trabajo con el nombre del proyecto

```bash
mkdir <nombre-proyecto>
cd <nombre-proyecto>
```

Creación del arquetipo básico del proyecto

```bash
npm init -y
```

2) Validar la creación 'package.json':

Nota : Con el paso anterior se habrá creado un fichero de control del proyecto en su versión inicial

``` js
{
  "name": "<nombre-proyecto>",
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

3) Crear directorios tipo (opcional)
* "bin" : incluye los script de ejecución o que puedan ayudar en el proyecto
* "src" : incluye el código fuente
* "test": incluye el testing

## Definición de tareas iniciales del proyecto

Añadir al fichero 'package.json':

``` js
"scripts": {
    "clean": "rm -rf package-lock.json && npm install",
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

## Instalación de dependencias iniciales 

En este caso no se añade ninguna dependencia

Fichero 'package.json':

``` js
"dependencies": {
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
