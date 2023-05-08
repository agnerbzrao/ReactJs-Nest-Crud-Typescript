# File insertion of financial transactions and their listing.

The purpose of this project is to make it possible to upload a file of financial transactions for the sale of the creator and his affiliates.

After receiving this file via upload, the project will process this file and save it in the database. This will enable the listing of each financial transaction.

# Project's tools

This project uses the following tools:
  - ReactJs for the frontend;
  - NodeJs with NestJs framework for the backend; It is
  - Mysql for the database

# How to Install and Run the Project

Before installing this project, make sure that docker is installed on your computer.

Download the project

Afterwards, enter in project's folder and execute the following command:

`docker compose up --build`

After docker downloads the images and containers are running the frontend will access the following URL `http://localhost:80/`
The backend can be accessed at the following URL` http://localhost:3001/`

To run the unit tests, run the command:

 `docker exec -it nestjs-project /bin/sh` 

 and then, inside the container, run the command
  `npm run test `