# mailbox-front

Frontend-side of Mailbox, web application to encrypt/decrypt message using public key infrastructure. For the backend-side, click [here](https://github.com/izharul-haq/mailbox-back).

## Requirements

1. [Node.JS](https://nodejs.org/en/)

2. [yarn](https://yarnpkg.com/) package manager

## How to Install

Install dependencies with

    yarn install

## How to Run

0. Make sure all dependencies already installed.

1. Run application in:

   - Development mode with

         yarn dev

   - Production mode with

         yarn build-production && yarn start

2. Open `localhost:8080` on your browser

## How to Use

0. Make sure [backend-side](https://github.com/izharul-haq/mailbox-back) of this web application is running.

1. Run this application (follow [How to Run](#how-to-run))

2. Click any available algorithm on the left side of the screen to expand submenu.

3. Choose `Generate Key` to generate keys that will be used during encryption and decryption.

4. Choose `Encrypt/Decrypt` to encrypt or decrypt message (text/file) using the choosen algorithm (key must be generated first).
