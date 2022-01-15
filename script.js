function display()
{
  document.getElementById("bt1").style.visibility = "visible";
  document.getElementById("bt2").style.visibility = "visible";
}

function schedule() 
{
  let url1 = 'https://ergast.com/api/f1/2022.json';
  calendar(url1);
}

var year = 2005;
var till = 2021;
var select = document.getElementById("raceyear");
for(var y=year; y<=till; y++)
{
  option1 = document.createElement( 'option' );
  option1.value = option1.text = y;
  select.add( option1 );
}

var select = document.getElementsByTagName('select')[0];
select.selectedIndex = select.options.length-1;

function selectyear() 
{
  var ryear = document.getElementById('raceyear');
  var value =ryear.options[ryear.selectedIndex].value;
  let web1="https://ergast.com/api/f1/";
  let yearvalue = web1.concat(value);
  let web2 ="/driverStandings.json";
  let url1 = yearvalue.concat(web2);
  getraceyear(value);
}

function driverStandings() 
{
  var ryear = document.getElementById('raceyear');
  var value =ryear.options[ryear.selectedIndex].value;
  let web1="https://ergast.com/api/f1/";
  let yearvalue = web1.concat(value);
  let web2 ="/driverStandings.json";
  let url1 = yearvalue.concat(web2);
  DriverStandingsTable(url1);
}

function constructorStandings() 
{
  var ryear = document.getElementById('raceyear');
  var value =ryear.options[ryear.selectedIndex].value;
  let web1="https://ergast.com/api/f1/";
  let yearvalue = web1.concat(value);
  let web2 ="/constructorStandings.json";
  let url1 = yearvalue.concat(web2);
  constructorStandingsTable(url1);
}

function getraceyear(yearofrace)
{
  var circuit = document.getElementById("racecircuit");
  for(var i = circuit.options.length-1;i>0;i--)
  {
    circuit.removeChild(circuit.options[i]);
  }
  let web1="https://ergast.com/api/f1/";
  let url = web1.concat(yearofrace);
  let web2 =".json";
  let url1 = url.concat(web2);
  fetch(url1)
    .then(response => response.json())
    .then(data => 
    {
      var totalrace = data.MRData.total;
      var start = 0;
      for(var i=start; i<totalrace; i++)
      {
        var racename = data.MRData.RaceTable.Races[i].raceName;
        var raceround = data.MRData.RaceTable.Races[i].round;
        option2 = document.createElement( 'option' );
        option2.value = raceround;
        option2.text = racename ;
        circuit.add( option2 );
      }
    });
}

function selectqualifying() 
{
  var rcircuit = document.getElementById('racecircuit');
  var circuitvalue =rcircuit.options[rcircuit.selectedIndex].value;
  var ryear = document.getElementById('raceyear');
  var racevalue =ryear.options[ryear.selectedIndex].value;
  let web1="https://ergast.com/api/f1/";
  let year = web1.concat(racevalue + "/");
  let circuit =year.concat(circuitvalue);
  let web2 = "/qualifying.json";
  let url1 = circuit.concat(web2);
  qualifyingtable(url1);
}

function selectrace()
{
  var rcircuit = document.getElementById('racecircuit');
  var circuitvalue =rcircuit.options[rcircuit.selectedIndex].value;
  var ryear = document.getElementById('raceyear');
  var racevalue =ryear.options[ryear.selectedIndex].value;
  let web1="https://ergast.com/api/f1/";
  let year = web1.concat(racevalue + "/");
  let circuit =year.concat(circuitvalue);
  let web2 = "/results.json";
  let url1 = circuit.concat(web2);
  ResultsTable(url1);
}

  
function currentrace()
{
  fetch("https://ergast.com/api/f1/2021/22/results.json")
    .then(response => response.json())
    .then(result =>
      {
        data = result.MRData.RaceTable.Races[0].Results;
        var output = document.getElementById("table1")
        output.innerHTML = "";
        output.innerHTML += `
        <thead class = "heading">
          <tr>
          <th scope="col">Postion</th>
          <th scope="col">Driver Number</th>
          <th scope="col">Driver Name</th>
          <th scope="col">Constructor</th>
          <th scope="col">Laps</th>
          <th scope="col">Status</th>
          <th scope="col">Points</th>
          </tr>
        </thead>
        `
        data.forEach(element => 
        {
          
          output.innerHTML += `
          <tr>
          <td>${element.position}</td>
          <td>${element.number}</td>
          <td>${element.Driver.givenName + ' ' + element.Driver.familyName}</td>
          <td>${element.Constructor.name}</td>
          <td>${element.laps}</td>
          <td>${element.status}</td> 
          <td>${element.points}</td>
          </tr> 
          `
        });
      })
      .catch((error) =>
      {
        console.log(error)
      })
}

        

function qualifyingtable(urlink)
{
  fetch(urlink)
    .then(response => response.json())
    .then(result => 
      {
      data = result.MRData.RaceTable.Races[0].QualifyingResults;
      var output = document.getElementById("table1")
      output.innerHTML = "";
      output.innerHTML += `
      <thead class = "heading">
        <tr>
        <th scope="col">Postion</th>
        <th scope="col">Driver Number</th>
        <th scope="col">Driver Name</th>
        <th scope="col">Constructor</th>
        <th scope="col">Q1</th>
        <th scope="col">Q2</th>
        <th scope="col">Q3</th>
        </tr>
      </thead>
      `
      data.forEach(element =>
      {
        let q1 = element.Q1;
        let q2 = element.Q2;
        let q3 = element.Q3;
        if (q1 == null || q1 === "" )
        {
          q1 = "No Time";
        }

        if (q2 == null || q2 === "" )
        {
          q2 = "No Time";
        }
        if (q3 == null || q2 === "")
        {
          q3 = "No Time";
        }
        output.innerHTML += `
        <tr>
        <td>${element.position}</td>
        <td>${element.number}</td>
        <td>${element.Driver.givenName + ' ' + element.Driver.familyName}</td>
        <td>${element.Constructor.name}</td>
        <td>${q1}</td>
        <td>${q2}</td> 
        <td>${q3}</td> 
        </tr> 
        `
      });
    })
    .catch((error) =>
    {
      console.log(error)
    })
}


function DriverStandingsTable(urlink)
{
  fetch(urlink)
    .then(response => response.json())
    .then(result => {
      data = result.MRData.StandingsTable.StandingsLists[0].DriverStandings
      var output = document.getElementById("table1")
      output.innerHTML = "";
      output.innerHTML += `
      <thead class = "heading">
        <tr>
        <th scope="col">Postion</th>
        <th scope="col">Driver Name</th>
        <th scope="col">Constructor</th>
        <th scope="col">Points</th>
        <th scope="col">Wins</th>
        </tr>
      </thead>
      `
      data.forEach(element =>
      {      
        output.innerHTML += `
        <tr>
        <td>${element.position}</td>
        <td>${element.Driver.givenName + ' ' + element.Driver.familyName}</td>
        <td>${element.Constructors[0].name}</td>
        <td>${element.points}</td>
        <td>${element.wins}</td> 
        </tr> 
        `
      });
  
    })
    .catch((error) => 
    {
      console.log(error)
    })  
}

function ResultsTable(urlink)
{
  fetch(urlink)
    .then(response => response.json())
    .then(result => 
    {
      data = result.MRData.RaceTable.Races[0].Results;
        var output = document.getElementById("table1")
        output.innerHTML = "";
        output.innerHTML += `
        <thead class = "heading">
          <tr>
          <th scope="col">Postion</th>
          <th scope="col">Driver Number</th>
          <th scope="col">Driver Name</th>
          <th scope="col">Constructor</th>
          <th scope="col">Laps</th>
          <th scope="col">Status</th>
          <th scope="col">Points</th>
          </tr>
        </thead>
        `
        data.forEach(element => 
        {
          
          output.innerHTML += `
          <tr>
          <td>${element.position}</td>
          <td>${element.number}</td>
          <td>${element.Driver.givenName + ' ' + element.Driver.familyName}</td>
          <td>${element.Constructor.name}</td>
          <td>${element.laps}</td>
          <td>${element.status}</td> 
          <td>${element.points}</td>
          </tr> 
          `
        });
    })
      .catch((error) =>
      {
        console.log(error)
      })
}

function constructorStandingsTable(urlink)
{
  fetch(urlink)
    .then(response => response.json())
    .then(result =>
    {
      data = result.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
      var output = document.getElementById("table1")
      output.innerHTML = "";
      output.innerHTML += `
      <thead class = "heading">
        <tr>
        <th scope="col">Postion</th>
        <th scope="col">Constructor</th>
        <th scope="col">Nationality</th>
        <th scope="col">Points</th>
        <th scope="col">Wins</th>
        </tr>
      </thead>
      `
      data.forEach(element => 
      {
        output.innerHTML += `
        <tr>
        <td>${element.position}</td>
        <td>${element.Constructor.name}</td>
        <td>${element.Constructor.nationality}</td>
        <td>${element.points}</td>
        <td>${element.wins}</td> 
        </tr> 
        `
      });
    })
    .catch((error) => 
    {
      console.log(error)
    })
}


function calendar(urlink)
{
  fetch(urlink)
    .then(response => response.json())
    .then(result => 
    {
      data = result.MRData.RaceTable.Races;
      var output = document.getElementById("table1")
      output.innerHTML = "";
      output.innerHTML += `
      <thead class = "heading">
        <tr>
        <th scope="col">Round</th>
        <th scope="col">Race Name</th>
        <th scope="col">Circuit</th>
        <th scope="col">Date</th>
        </tr>
      </thead>
      `
      data.forEach(element => 
      {   
        output.innerHTML += `
        <tr>
        <td>${element.round}</td>
        <td>${element.raceName}</td>
        <td>${element.Circuit.circuitName}</td>
        <td>${element.date}</td> 
        </tr> 
        `
      });
    })
    .catch((error) => 
    {
      console.log(error)
    })
}
