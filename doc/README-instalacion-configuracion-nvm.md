# Instalar NVM (Node Version Manager)
Herramienta que permite instalar y configurar la versión de nodejs con la que trabajar (ayuda a trabajar / gestionar diferentes versiones y por lo tanto gestionar diferentes entornos de trabajo)

- https://nodejs.org/en/download/package-manager/
- https://www.sitepoint.com/quick-tip-multiple-versions-node-nvm/
- https://github.com/creationix/nvm
- https://github.com/coreybutler/nvm-windows


Revisar la version instalada 

```bash
nvm version
```

Pasos: 

* Instalación de una versión de nodejs desde nvm
* Establecer la versión de node con la que trabajar



Ejecutar el siguiente comando para ejecutar la versión 8.10.0

```bash
nvm install 8.10.0

node --version
v8.10.0
```
Nota : de esta forma nos aseguramos de tener dicha versión instalada

## Establecer la versión de node con la que trabajar

En caso de disponer de más de una versión, se puede elegir con cual trabajar. Para ello se mostrarán todas las versiones instaladas identificadas y posteriormente se indicara cual utilizar.

Ejecutar el siguiente comando 

```bash
nvm list

    11.3.0
  * 10.14.1
    8.10.0 

nvm use 8.10.0
...
nvm list

    11.3.0
    10.14.1
  * 8.10.0 

```

Se puede utilizar la configuración a partir de un fichero de configuración : .nvmrc

Ejecutar el siguiente comando en un directorio junto a ese fichero

```bash
nvm use
```