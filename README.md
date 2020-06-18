# Order Service (BackEnd)
![node-current](https://img.shields.io/node/v/package)
![GitHub last commit](https://img.shields.io/github/last-commit/Merchanntt/Desafio_09)

Builded in Node, Typescript and Express, this application was designed to create and list customers, products and orders. Updating the data automatically when is ordered.

## Features

You can make orders of any products, if as available quantity in stock and show your orders list when is done.

## Getting Started

To execute this project, you will need:
- Insominia;
- Code Editor (I recommend the Visual Studio Code);
- Docker (With PostGres, MongoDb and Redis containers);

## Development

To begin the development, is necessary to clone this GITHUB repository:

```shell
cd "dir from your preference"
git clone https://github.com/Merchanntt/Desafio_09
```

### Building

To initialize this project, first, run this command and install all the dependencies: 

```shell
yarn 
```

Now, you just need to use the next command, run the server and the api will be ready:

```shell
yarn dev:server
```

## Tests

Let's suppose that you make some changes and wants to see if the applications still works. To make sure, use...

```
yarn test
```

