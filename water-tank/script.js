function getData() {
  var input = document.getElementById("input");
  var inputArr = input.value.split(",").map(Number);

  var wallsWithWaterArr = getWallsAndWater(inputArr);
  var waterOnlyArr = getWaterOnly(inputArr, wallsWithWaterArr);
  var waterCount = getCount(waterOnlyArr);

  var barsColor = getBarColor(inputArr, wallsWithWaterArr);

  createBars(wallsWithWaterArr, barsColor, "#one");
  createBars(waterOnlyArr, barsColor, "#two");

  document.getElementById("water").innerHTML += `<h3>
                    Total ${waterCount} Units of Water.
                </h3>`;
}

const getWallsAndWater = (arr) => {
  const result = arr.slice();

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) {
      let left = getLeftWall(arr, i);
      let right = getRightWall(arr, i);

      if (left !== null && right !== null) {
        result[i] = Math.min(left, right);
      }
    }
  }

  return result;
};

const getLeftWall = (arr, index) => {
  for (let i = index - 1; i >= 0; i--) {
    if (arr[i] !== 0) {
      return arr[i];
    }
  }
  return null;
};
const getRightWall = (arr, index) => {
  for (let i = index + 1; i < arr.length; i++) {
    if (arr[i] !== 0) {
      return arr[i];
    }
  }
  return null;
};

const getWaterOnly = (wallsOnly, wallsAndWater) => {
  var waterArray = [];

  for (let i = 0; i < wallsOnly.length; i++) {
    if (wallsOnly[i] !== wallsAndWater[i]) {
      waterArray[i] = wallsAndWater[i];
    } else {
      waterArray[i] = 0;
    }
  }

  return waterArray;
};

const getCount = (waterArray) => {
  var totalWater = 0;

  var totalWater = waterArray.reduce(function (total, currentNumber) {
    return total + currentNumber;
  }, 0);

  return totalWater;
};

const getBarColor = (arr1, arr2) => {
  var colors = [];

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] - arr2[i] < 0) {
      colors[i] = "#74ccf4";
    } else {
      colors[i] = "#c9b7b1";
    }
  }
  return colors;
};

const createBars = (dataArr, colorArr, id) => {
 
  /*Format data */
  var dataSet = dataArr.map((value, index) => {
    return { key: index + 1, value: value };
  });

  /* Define size */
  const height = 300,
    width = 600,
    margin = 30;

  /* Define Data */
  const data = dataSet;
  var color = d3.scaleOrdinal(colorArr);

  /* Build Scales */
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data.map((d) => d.value))])
    .range([height - 3 * margin, margin]);

  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.key))
    .range([margin, width - 2 * margin]);

  /* Create & Draw the axis */
  const svg = d3.select(id).attr("width", width).attr("height", height);

  const yAxis = d3.axisLeft(yScale);
  svg.append("g").attr("transform", `translate(${margin},0)`).call(yAxis);
  const xAxis = d3.axisBottom(xScale);
  svg
    .append("g")
    .attr("transform", `translate(0,${height - 3 * margin})`)
    .call(xAxis);

  /* Draw the data bars */
  svg
    .selectAll("rect")
    .data(data.map((d) => d.value))
    .enter()
    .append("rect")
    .attr("x", (d, i) => margin + xScale(data[i].key))
    .attr("y", (d) => yScale(d))
    .attr("width", 40)
    .attr("height", (d) => height - 3 * margin - yScale(d))
    .attr("fill", function (d, i) {
      return color(i);
    });
};
