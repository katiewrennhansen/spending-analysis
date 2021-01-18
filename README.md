# Spending Analysis App

## Summary
The aim for this project is to create an application that will track monthly spending data and display insightful data visualizations based on all transactions made in a single month. The goal is not to store any user transaction data, but instead to allow a user to upload a CSV, which will automatically generate insights surrounding their spending habits. The current necessary format for the CSV is listed below. 

## CSV Data Structure
The neccessary fields for the CVS are as follows: 
* Amount - amount of money that was transfered
* Category - category of spending (Rent, Groceries, 'Restaurants' etc.) 
* Date - date the transaction occured
* Transaction Type - value of this field needs be be either credit or debit. 

Example Table:
| Amount | Category  | Date        | Transaction Type |
| ------ | --------- | ----------- | ---------------- |
| 100    | Groceries | 12/30/2019  | debit            |
| 500    | Paycheck  | 4/23/2020   | credit           |

Any additional fields may be added within the CSV however they will not be included in the calulations.

## Tech Stack
* React
* TypeScript 
* d3