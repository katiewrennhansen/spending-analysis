# Spending Analysis App

## Summary
The aim for this project is to create an application that will track monthly spending data and display insightful data visualizations based on all transactions made in a single month. The goal is not to store any user transaction data, but instead to allow a user to upload a CSV, which will automatically generate insights surrounding their spending habits. The current necessary format for the CSV is listed below. 

## CSV Data Structure
The neccessary fields for the CVS are as follows:

**Required**
* Amount - amount of money that was transfered (ex: 100, 350)
* Category - category of spending (ex: Rent, Groceries, Restaurants etc.) 
* Date - date the transaction occured (MM/DD/YYYY)
* Transaction Type - value of this field needs be be either 'credit' for all money coming into the account or 'debit' for money leaving the account. 

**Optional**
* Account Name - name of the account through which the transaction passed (ex: Checking, Savings)
* Description - description of the transaction or exact name of institution money was given to (ex: Grocery Store)

Example Table:
| Amount | Category  | Date        | Transaction Type |
| ------ | --------- | ----------- | ---------------- |
| 100    | Groceries | 12/30/2019  | debit            |
| 500    | Paycheck  | 4/23/2020   | credit           |

Any additional fields may be added within the CSV however they will not be included in the calulations. 

This application will automatically exclude any items that have a category of 'Transfer' or 'Credit Card Payment'. This is for my own internal use for this application, as I wish to exclude these particular transactions from my total calculations. In furture iterations, I intend to build out customizable category excustion functionality. For now, all items with the above mentioned categories will be excluded. 

A file containing dummy data is contained within this repository for testing purposed. That file is located in the root directory and is titled test-data.csv.

## Run Locally
* `yarn add` or `npm install` - to add all necessary dependancies
* `yarn run start` or  `npm start` - to run application on http://localhost:3000/

## Tech Stack
* React
* TypeScript 
* d3.js