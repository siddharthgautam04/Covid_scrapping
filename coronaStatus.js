// <-----------------Project CoronaStatus-------------->

/*The Aim of this project is to extract data from gov.corona web page and write that data in excel file using excel4node module*/

// excel4node
// A full featured xlsx file generation library allowing for the creation of advanced Excel files.

// Requiring modules
let minimist = require("minimist");
let axios = require("axios");
let excel = require("excel4node");
let fs = require("fs");
let args = minimist(process.argv);
let jsdom = require("jsdom");

// node coronaStatus.js --myUrl="https://www.mygov.in/covid-19" --myFileName="coronaData.json" --myCountry="CoronaStatus@india" --mycsv="CoronaData.csv"


// Variables used
let url = args.myUrl;
let myFileName = args.myFileName;
let excelFile = args.mycsv;
let worksheet = args.myCountry;


// Getting data from webPage
let promiseOfAxios = axios.get(url);
promiseOfAxios.then(function (response) {
    let htmlPage = response.data;

    // Preparing dom 
    let virtualConsole = new jsdom.VirtualConsole();
    let dom = new jsdom.JSDOM(htmlPage, { virtualConsole });
    let document = dom.window.document;

    // Writing data in JSON file
    let coronastateInfo = document.querySelectorAll("div #stateCount > div .views-row");
    let arr = [];
    for (let i = 0; i < coronastateInfo.length; i++) {
        let stateWiseInfo = {
        };
        stateWiseInfo.statename = coronastateInfo[i].querySelector("span.st_name").textContent;
        stateWiseInfo.stNumber = coronastateInfo[i].querySelector("span.st_number").textContent;
        let innerInfo = coronastateInfo[i].querySelectorAll("div .st_all_counts > div");
        stateWiseInfo.confirmed = innerInfo[0].querySelector("div .tick-confirmed >small").textContent;
        stateWiseInfo.active = innerInfo[1].querySelector("div .tick-active >small").textContent;
        stateWiseInfo.discharged = innerInfo[2].querySelector("div .tick-discharged >small").textContent;
        stateWiseInfo.deaths = innerInfo[3].querySelector("div .tick-death >small").textContent;
        stateWiseInfo.vaccinated = innerInfo[4].querySelector("div .tick-total-vaccine >small").textContent;
        arr.push(stateWiseInfo);
    }
    let myData = JSON.stringify(arr);
    fs.writeFileSync(myFileName, myData, "utf-8");
    let jfile = fs.readFileSync(myFileName, "utf-8")
    let CoronaObj = JSON.parse(jfile);


    // Writing data in excel file

    // Creating new instance called workbook
    let wb = new excel.Workbook();

    // adding workSheet(single)
    let sheet = wb.addWorksheet(worksheet);

    let Hstyle1 = wb.createStyle({
        font: {
            size: 15,
            bold: true,
            italics: true,
            color: "white"
        },
        fill: {
            type: "pattern",
            patternType: "solid",

        }
    })
    sheet.cell(1, 1).string("State Name").style(Hstyle1);
    sheet.cell(1, 2).string("State Code").style(Hstyle1);
    sheet.cell(1, 3).string("Confirmed").style(Hstyle1);
    sheet.cell(1, 4).string("Active").style(Hstyle1);
    sheet.cell(1, 5).string("Discharged").style(Hstyle1);
    sheet.cell(1, 6).string("Death").style(Hstyle1);
    sheet.cell(1, 7).string("Vaccinated").style(Hstyle1);

    // Filling states Deatails in the cell
    for (let i = 0; i < CoronaObj.length; i++) {
        sheet.cell(2 + i, 1).string(CoronaObj[i].statename);
        sheet.cell(2 + i, 2).string(CoronaObj[i].stNumber);
        sheet.cell(2 + i, 3).string(CoronaObj[i].confirmed);
        sheet.cell(2 + i, 4).string(CoronaObj[i].active);
        sheet.cell(2 + i, 5).string(CoronaObj[i].discharged);
        sheet.cell(2 + i, 6).string(CoronaObj[i].deaths);
        sheet.cell(2 + i, 7).string(CoronaObj[i].vaccinated);
    }

    // Writing in excel file
    wb.write(excelFile);



})