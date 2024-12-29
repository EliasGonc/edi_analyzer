# EDI Web Analyzer
A web app for analyzing messages used in EDI (Electronic Data Interchange), displaying possible errors of a message written in a known layout.

This was a project for my "tecnólogo" degree at FATEC, Brazil (similar to an associate degree in the US).
The current version only supports the messaage type 001, version 60 of the RND standard, mostly used in Brazil.

## Running the application
In the current version, the application must be run in the client machine.
Node.js and NPM are required. Versions 22.11.0 and 10.9.0 were used, but the application might work with other versions.

After cloning the repository and installing the necesssary dependencies (`npm init`), use `npm seed` to fill the internal tables with the known layouts and `npm start` to run the application.

## Usage
Select the EDI standard, message type and message version in the dropdown menus at the top of the page. Paste the message to be analyzed in the message field and click the Analyze button. A second version of the message, with hoverable data elements will be available.
