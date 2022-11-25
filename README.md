This project allows you to upload CSV (UTF-8 encoded) files containing employee data.
Headers in CSV file will be not be uploaded, but please ensure headers only contain 4 columns in this specific order: id, name, login & salary

Id should only start with 'e'.
Salary should only be numbers.
All special characters are not allowed, except decimal point in 'salary'.

If your data contains non-English words (eg. 华文), please ensure that the CSV file is UTF-8 encoded.
# Converting CSV to UTF-8 encoding
From CSV file, Click "Save as" -> and select "Unicode-Text (*.txt)"
Open up the new .txt file and you should see that the data is separated with tabs.
Highlight and copy (Ctrl + C) one of the tabs.
Open up "Replace" with (Ctrl+ H).
Replace the tab with a comma (,) without spaces, and click "Replace all".
Click "File" -> "Save as"
Add a ".csv" to the file name. (eg. employee_file -> employee_file.csv)
Save as type: "All files"
Encoding: "UTF-8 with BOM"
Click "Save" and "Yes" to replacing the current employee_file.csv
