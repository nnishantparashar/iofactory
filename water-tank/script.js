function getData() {
  var input = document.getElementById("input");
  var inputArr = input.value.split(",").map(Number);

  var wallsWithWater = getWallsAndWater(inputArr);
  var waterOnly = getWaterOnly(inputArr, wallsWithWater);
  var waterCount = getCount(waterOnly);

  var barsColor = getBarColor(inputArr, wallsWithWater);

  createBars(wallsWithWater, barsColor, "#one");
  createBars(waterOnly, barsColor, "#two");

  document.getElementById("water").innerHTML += `<h3>
                    Total ${waterCount} Units of Water.
                </h3>`;
}

const getWallsAndWater = (arr) => {
  const result = arr.slice();

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) {
      let left = getNearestWall(arr, i, -1);
      let right = getNearestWall(arr, i, 1);

      if (left !== null && right !== null) {
        result[i] = Math.min(left, right);
      }
    }
  }

  return result;
};

const getNearestWall = (arr, index, direction) => {
  for (let i = index + direction; i >= 0 && i < arr.length; i += direction) {
    if (arr[i] !== 0) {
      return arr[i];
    }
  }
  return null;
};

const getWaterOnly = (wallsOnly, wallsAndWater) => {
  return wallsOnly.map((wall, i) =>
    wall !== wallsAndWater[i] ? wallsAndWater[i] : 0
  );
};

const getCount = (waterArray) => {
  return waterArray.reduce((total, current) => total + current, 0);
};

const getBarColor = (arr1, arr2) => {
  return arr1.map((wall, i) => (wall - arr2[i] < 0 ? "#74ccf4" : "#c9b7b1"));
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
