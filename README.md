
This project allows you to upload CSV (UTF-8 encoded) files containing employee data.
Headers in CSV file will be not be uploaded, but please ensure headers only contain 4 columns in this specific order: id, name, login & salary

Id should only start with 'e'.
Salary should only be numbers.
All special characters are not allowed, except decimal point in 'salary'.

If your data contains non-English words (eg. 华文), please ensure that the CSV file is UTF-8 encoded.
# Converting CSV to UTF-8 encoding
1. From CSV file, Click "Save as" -> and select "Unicode-Text (*.txt)"
2. Open up the new .txt file and you should see that the data is separated with tabs.
3. Highlight and copy (Ctrl + C) one of the tabs.
4. Open up "Replace" with (Ctrl+ H).
5. Replace the tab with a comma (,) without spaces, and click "Replace all".
6. Click "File" -> "Save as"
7. Add a ".csv" to the file name. (eg. employee_file -> employee_file.csv)
8. Save as type: "All files"
9. Encoding: "UTF-8 with BOM"
10. Click "Save" and "Yes" to replacing the current employee_file.csv

# Start up the application
You need to have these installed on your computer:
1. Java 17 - https://www.oracle.com/sg/java/technologies/downloads/
2. Maven - https://maven.apache.org/download.cgi
3. MySQL 8 Workbench - https://dev.mysql.com/downloads/workbench/

Once you git clone the project, in the cmd terminal,

## Frontend
1. cd to /angular-springboot/frontend
2. npm install
3. ng serve
4. go to any browser(eg. Google Chrome) and go to this url: http://localhost:4200

## Backend
1. cd to /angular-springboot/backend
2. mvn install
3. mvn spring-boot:run
4. go to url: http://localhost:8081/users, you should see an empty JSON array.

# Done!
Try uploading with sample CSV files in angular-springboot/data
