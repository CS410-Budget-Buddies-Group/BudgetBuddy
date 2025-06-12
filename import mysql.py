import mysql.connector

conn = mysql.connector.connect(
    host = '127.0.0.1',
    port = 3306,
    user = "admin",
    password = "RyRy3030!",
    database = "BudgetBuddy",

)

print('hello world')
conn.close()