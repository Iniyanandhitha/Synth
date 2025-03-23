# Prediction Market for Friends Group

This project is a prediction market application built using blockchain technology and a Next.js frontend. It allows users to create and participate in prediction markets within a friends group.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create prediction markets
- Participate in prediction markets
- View market outcomes
- Secure and transparent transactions using blockchain

## Technologies Used

- **Blockchain**: Hardhat, Solidity
- **Frontend**: Next.js, React
- **Smart Contract Deployment**: Hardhat
- **Styling**: CSS, Tailwind CSS (if used)

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

- Node.js and npm installed on your machine
- Git installed on your machine

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/Iniyanandhitha/Synth.git
    cd Synth
    ```

2. Install dependencies for both the blockchain and frontend:

    ```sh
    # Navigate to the Blockchain directory and install dependencies
    cd Blockchain
    npm install

    # Navigate to the Frontend directory and install dependencies
    cd ../Frontend
    npm install
    ```

3. Configure environment variables:

    Ensure that the `.env` file in the `Blockchain` directory is properly configured with the necessary environment variables, such as `ACCOUNT_PRIVATE_KEY`.

4. Compile and deploy smart contracts:

    ```sh
    # Navigate to the Blockchain directory
    cd Blockchain

    # Compile the smart contracts
    npx hardhat compile

    # Deploy the smart contracts
    npx hardhat run scripts/deploy.ts --network opencampus
    ```

5. Start the frontend development server:

    ```sh
    # Navigate to the Frontend directory
    cd ../Frontend

    # Start the Next.js development server
    npm run dev
    ```

6. Open your web browser and navigate to `http://localhost:3000` to access the application.

## Usage

- Create a new prediction market by specifying the details.
- Participate in existing prediction markets by placing your predictions.
- View the outcomes of the markets and see the results.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
