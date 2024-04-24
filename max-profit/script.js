
const data = {
  establishments: ["theatre", "pub", "commercialPark"],
  timeUnits: { theatre: 5, pub: 4, commercialPark: 10 },
  earningFactor: { theatre: 1500, pub: 1000, commercialPark: 3000 },
  results: [],

} 

function getData() {
  var input = document.getElementById("input").value;
  const { establishments, timeUnits, earningFactor, results } = data;

  results.length = 0;

  establishments.forEach((establishment) =>{
    if (input > timeUnits[establishment]) {
      getMaxProfit(input, 0, 0, 0, establishment);
    }
  });
  var para = document.getElementById("data");
  para.innerHTML = `<p>
                    Time Units : ${input}
                </p>`;
  if (results.length) {
    var maxProfit = Math.max(...results.map((i) => i.maxProfit));
    para.innerHTML += `<p>Earnings : $${maxProfit}</p>`;
    para.innerHTML += `<p>Solutions :</p>`;
    results.forEach((element, i) => {
      if (element.maxProfit === maxProfit) {
        para.innerHTML += `<p>${i + 1} : T:${element.theatre}  P:${element.pub}  C:${element.commercialPark}</p>`;
      }
    });
  } else {
    para.innerHTML += `<p>Oops.. !! Time unit is not sufficient.</p>`;
  }
}

const getMaxProfit = (input, profit, maxProfit, count, establishment) => {
  var units = input - data.timeUnits[establishment];
  profit += units * data.earningFactor[establishment];
  count += 1;
  if (profit > maxProfit) {
    maxProfit = profit;
  }
  if (units > data.timeUnits[establishment]) {
    getMaxProfit(units, profit, maxProfit, count, establishment);
  }
  var ans = { theatre: 0, pub: 0, commercialPark: 0, maxProfit: maxProfit };
  ans[establishment] = count;
  data.results.push(ans);
};
