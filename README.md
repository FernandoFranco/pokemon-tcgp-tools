# Pokémon TCGP

This is a Pokémon Trading Card Game Project.

## Getting Started

### Prerequisites

- Node.js
- Yarn

### Installation

1. Clone the repository:

```sh
git clone https://github.com/yourusername/pokemon-tcgp.git
```

2. Navigate to the project directory:

```sh
cd pokemon-tcgp
```

3. Install dependencies:

```sh
yarn install
```

### Generating SSL for localhost

To generate SSL certificates for localhost using mkcert, follow these steps:

#### Install mkcert

**Windows:**

1. Install mkcert using a package manager:

with choco:

```sh
choco install mkcert
```

or with winget:

```sh
winget install mkcert
```

**Linux:**

1. Install mkcert using a package manager:

with brew:

```sh
brew install mkcert
```

#### Generate Certificates

1. Create a local CA:

```sh
mkcert -install
```

2. Generate the certificates:

```sh
mkcert localhost
```

This will create `localhost.pem` and `localhost-key.pem` files in your current directory.

### Usage

To start the development server, run:

```sh
yarn start
```

To lint the code, use:

```sh
yarn lint
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
