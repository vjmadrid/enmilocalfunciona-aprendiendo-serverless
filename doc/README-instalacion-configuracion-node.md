# Instalar y Configurar de Node.js

Node.js (https://nodejs.org) es un motor de ejecución Javascript de que funciona en el lado del servidor

Pasos:

* Instalar Node.js
* Instalar NPM (Node Package Manager)


## Instalar Node.js 

Acceder a la página oficial a la zona de descargas

* https://nodejs.org

* https://nodejs.org/en/download/

Seguir los pasos de instalación dependiendo de la plataforma utilizada

Revisar la versión instalada¡

```bash
node --version
```

## Instalar npm (Node Package Manager)
Herramienta que permite gestionar los paquetes/dependencias de node

https://www.npmjs.com/

>IMPORTANTE: 
>* Se suele instalar por defecto con la versión de node
>* Requiere actualizaciones de versiones


Revisar la version instalada

```bash
npm --version
```
Recordatorio para instalar una dependencia (las más habituales)

```bash
# Instalación de las dependencias del fichero package.json en el directorio node_modules local
npm install 

# Instalación de las dependencias del fichero package.json en el directorio node_modules global
npm install -g 

# Instalación de la dependencia en el área "dependencies" del fichero package.json
npm install <dependencia>

# Instalación de la dependencia en el área "devDependencies" del fichero package.json
npm install <dependencia> --save-dev

# Instalación de una dependencia con una versión concreta
npm install <dependencia>@<version>
```

Recordatorio para desinstalar una dependencia (las más habituales)

```bash
# Desinstalación de la dependencia en el área "dependencies" del fichero package.json en el directorio node_modules local
npm uninstall <dependencia>

# Desinstalación de la dependencia en el área "dependencies" del fichero package.json en el directorio node_modules global
npm uninstall <dependencia> -g
```
