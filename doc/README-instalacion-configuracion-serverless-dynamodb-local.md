# Instalar y Configurar serverless-dynamodb-local

**Plugin de Serverless** que facilita un entorno "mock" para trabjar con DynamoDB de AWS en local a traves de un plugin específico de serverless

https://www.npmjs.com/package/serverless-dynamodb-local

>IMPORTANTE : Actualmente solo funciona bien con la version 0.2.30

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

* Verificar la versión de Serverless Offline

Revisar la version 

```bash
sls offline --help
```

## Instalar el plugin serverless-dynamodb-local

* **[serverless-dynamodb-local](https://www.npmjs.com/package/serverless-dynamodb-local)** : Emula AWS Dynbamodb en local para el framework de Serverless


**IMPORTANTE::** en caso de que exista otra version previamente instalada ejecutar los siguientes comandos

``` bash
npm uninstall serverless-dynamodb-local
sls dynamodb uninstall
```

Instalar la dependencia con la version adecuada

``` bash
npm install serverless-dynamodb-local@0.2.30
sls dynamodb install
```

O bien añadir al fichero 'package.json':

``` js
"devDependencies": {
    ...
    "serverless-dynamodb-local": "^0.2.30",
    ...
  }
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
  - serverless-dynamodb-local
  - serverless-offline #serverless-offline needs to be last in the list
```

## Script de construcción de la tabla

Definir la opción de construcción de tabla mediante un script en el directorio offline/migrations

``` js
{
    "Table": {
        "TableName": "example-table",
        "KeySchema": [
            {
                "AttributeName": "id",
                "KeyType": "HASH"
            }
        ],
        "AttributeDefinitions": [
            {
                "AttributeName": "id",
                "AttributeType": "S"
            }
        ],
        "ProvisionedThroughput": {
            "ReadCapacityUnits": 1,
            "WriteCapacityUnits": 1
        }
    }
}
```

Añadir los recursos en el fichero serverless.xml

Se ha configurado el plugin y la cadena de conexión especifica por si tuviera algun tipo de particularidad

``` bash
custom:
  dynamodb:
    start:
      port: 8000
      inMemory: true
      migrate: true
    migration:
      dir: offline/migrations
  localstack:
    dynamodb :
      arn : "arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/${self:provider.environment.DYNAMODB_TABLE}"
  offline:
    dynamodb :
      arn : "arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/${self:provider.environment.DYNAMODB_TABLE}"

```

Se han considerado dos ARN independientes por si hubiera algun factor diferentes (en este caso son similares)

Se han configurado las opciones de autorización sobre las operaciones de base de datos

``` bash
provider:
  name: aws
  runtime: nodejs8.10
  stage: dev
  region: us-east-1
  environment:
    DYNAMODB_TABLE: example-table
  iamRoleStatements:
    - Effect: Allow
      Action:
        - dynamodb:Query
        - dynamodb:Scan
        - dynamodb:GetItem
        - dynamodb:PutItem
        - dynamodb:UpdateItem
        - dynamodb:DeleteItem
      Resource: "${self:custom.offline.dynamodb.arn}"
```