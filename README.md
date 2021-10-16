# Covid_scrapping

## About Covid_scrapper
Made a web scrapper which has ability to scrap the covid website and keep those stats in excel .
The purpose of this project is to extract information of covid status from covid.gov.in and present that information in the form of excel. The application can be used
to solve real purpose problems of extracting large information from websites.

## TECH STACK USED
 -  JAVASCRIPT
 -  NPM Modules
    -  Minimist--> Takes command line arguments
    -  Axios--> For making http request <br>
    -  JSDOM--> For getting information from dom tree
    -  EXCEL4NODE--> Used to make excel filr
    
 
 ## FEATURES AND FUNCTIONS
 Dowloading data in the form of HTML by making a http request using axios as we are not using any browser so axios will help to achieve this.
 Reading HTML and extracting important and useful information using Jsdom
 Converting matches to teams using Array Manipulation
 Making of excel file and adding important stuff in that excel using excel4node library
 
 
 ## TO RUN THIS ON YOUR LOCAL
   First fork this to your profile, then clone it to your desktop
   
   Then install libraries 
   ```bash
  npm install minimist
  npm install axios
  npm install excel4node
  npm install jsdom
  
  ```
  
  To run this project use this command
  
  ```bash
     
     node coronaStatus.js --myUrl="https://www.mygov.in/covid-19" --myFileName="coronaData.json" --myCountry="CoronaStatus@india" --mycsv="CoronaData.csv"

 ```
## Code Summary
1. Read the command line arguments using minimist.

2. Read the HTML file use axios and convert it to DOM using JSDOM.

3. Using HTML elements and their class read the data which we need and push it into a JSO object.

4. Using the above JSO object with all match details we make another JSO which has team details using array manipulation.

5. Using the teams JSO and excel4node create an excel file with every details in a sheet.



## CONTACT
In case of any suggestions or enquires, feel free to reach out to me at Sidgautam0104@gmail.com.
 
 

