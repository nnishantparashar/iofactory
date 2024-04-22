/*
Given Constants:
Time Units: Theatre: 5, Pub: 4, Commercial Park: 10;
Earning Factor: Theatre: 1500, Pub: 1000, Commercial Park: 3000;


*/
const establishments = ["theatre", "pub", "commercialPark"];
const timeUnits = { theatre: 5, pub: 4, commercialPark: 10 };
const earningFactor = { theatre: 1500, pub: 1000, commercialPark: 3000 };

var results = [];
function getData() {
  var input = document.getElementById("input").value;
  for (let i = 0; i < establishments.length; i++) {
    var maxProfit = 0;
    var profit = 0;
    var count = 0;
    if (input > timeUnits[establishments[i]]) {
      getMaxProfit(input, profit, maxProfit, count, establishments[i]);
    }
  }

  var para = document.getElementById("para");

  var para = document.getElementById("data");
  para.innerHTML = `<p>
                    Time Units : ${input}
                </p>`;
  if (results.length) {
    var earning = Math.max(...results.map((i) => i.maxProfit));
    para.innerHTML += `<p>
                Earnings : $${earning}
                
            </p>`;
    para.innerHTML += `<p>
            
            Solutions :
        </p>`;
    results.forEach((element, i) => {
      if (element.maxProfit === earning) {
        para.innerHTML += `<p>
                        ${i + 1} : T:${element.theatre}  P:${element.pub}  C:${
          element.commercialPark
        }
                        </p>`;
      }
    });
  } else {
    para.innerHTML += `<p>
                Oops.. !! Time unit is not sufficient.
            </p>`;
  }
}

const getMaxProfit = (input, profit, maxProfit, count, establishment) => {
  var units = input - timeUnits[establishment];
  profit += units * earningFactor[establishment];
  count += 1;
  if (profit > maxProfit) {
    maxProfit = profit;
  }
  if (units > timeUnits[establishment]) {
    getMaxProfit(units, profit, maxProfit, count, establishment);
  }
  var ans = { theatre: 0, pub: 0, commercialPark: 0, maxProfit: maxProfit };
  for (let i = 0; i < establishments.length; i++) {
    const element = establishments[i];
    if (establishment === element) {
      ans[establishment] = count;
    }
  }

  results.push(ans);
};
