# Instalar y Configurar Localstack

**Entorno "mock"** para trabjar con el **stack cloud de AWS** en **local**

https://github.com/localstack/localstack


Pasos: 

* Verificar Prerrequisitos 
* Instalar Serverless Framework

## Verificar Prerrequisitos 

* Verificar la versión de docker

## Instalar Localstack

Instalación de 'localstack' como contenedor de docker:

``` bash
$ docker pull localstack/localstack
$ docker run -it -e LOCALSTACK_HOSTNAME="localhost" -p 8080:8080 -p 443:443 -p 4567-4583:4567-4583 -p 4590-4593:4590-4593 -v "/private/var/folders/22/v0pf_r7x7tj6dyn5w3ysx58r0000gp/T/localstack:/tmp/localstack" -v "/var/run/docker.sock:/var/run/docker.sock" -e DOCKER_HOST="unix:///var/run/docker.sock" -e HOST_TMP_FOLDER="/private/var/folders/22/v0pf_r7x7tj6dyn5w3ysx58r0000gp/T/localstack" --name localstack localstack/localstack
```

docker run -e LOCALSTACK_HOSTNAME="localhost" -p 8080:8080 -p 443:443 -p 4567-4583:4567-4583 -p 4590-4593:4590-4593 --name localstack localstack/localstack

Gestión de contenedor 'localstack':

``` bash
$ docker ps
$ docker logs localstack
$ docker stop localstack
$ docker start localstack
```


## Configurar Localstack

### Arrancar Localstack

Arrancar mediante docker compose :

``` bash
docker-compose up
```

Con esta configuración arrancará con todo

``` bash
...
localstack_1  | Starting local dev environment. CTRL-C to quit.
localstack_1  | 2019-02-16T16:39:57:INFO:werkzeug:  * Running on http://0.0.0.0:8080/ (Press CTRL+C to quit)
localstack_1  | 2019-02-16T16:39:57:INFO:werkzeug:  * Restarting with stat
localstack_1  | Starting mock API Gateway (http port 4567)...
localstack_1  | Starting mock DynamoDB (http port 4569)...
localstack_1  | Starting mock SES (http port 4579)...
localstack_1  | Starting mock Kinesis (http port 4568)...
localstack_1  | Starting mock Redshift (http port 4577)...
```

Se pueden añadir opciones en el arranque:

``` bash
SERVICES=sqs DEFAULT_REGION=eu-west-1
```

SERVICES=sqs DEFAULT_REGION=eu-west-1


Acceso a la consola web de localstack

* URL: http://localhost:8080


### Gestión de recursos AWS

### Gestión de DynamoDB

- URL: http://localhost:4569

**Creación de tabla "example-table"**

``` bash
aws dynamodb create-table --table-name local-example-table --attribute-definitions AttributeName=id,AttributeType=S --key-schema AttributeName=id,KeyType=HASH --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 --endpoint-url http://localhost:4569 --region us-east-1
```

O a traves del fichero JSON del direcctorio offline/migrations

``` bash
aws dynamodb create-table --cli-input-json file://tables.json --endpoint-url http://localhost:4569 --region us-east-1
```

**Identificar el ARN**

Por ejemplo : 
``` bash
arn:aws:dynamodb:us-east-1:000000000000:table/example-table
```