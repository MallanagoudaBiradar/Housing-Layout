import "./App.css";
import React, { useState } from "react";

const HOUSE = "House";
const RESTAURANT = "Restaurant";
const GYM = "Gym";
const HOSPITAL = "Hospital";
const HOSGYM = "Hospital+Gym";
const RESHOS = "Restaurant+Hospital";
const RESGYM = "Restaurant+Gym";
const RGH = "Restaurant+Gym+Hospital";

const App = () => {
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [layout, setLayout] = useState([]);
  const [recommendation, setRecommendation] = useState("");

  const createLayout = () => {
    const newLayout = Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => null)
    );
    setLayout(newLayout);
  };

  const assignPlot = (row, col, service) => {
    const newLayout = [...layout];
    newLayout[row][col] = service;
    setLayout(newLayout);
  };

  const generateRandomLayout = () => {
    const newLayout = Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => {
        const randomValue = Math.random();
        if (randomValue < 0.2) return HOUSE;
        else if (randomValue < 0.3) return RESTAURANT;
        else if (randomValue < 0.4) return GYM;
        else if (randomValue < 0.5) return HOSGYM;
        else if (randomValue < 0.6) return RESHOS;
        else if (randomValue < 0.7) return RESGYM;
        else if (randomValue < 0.8) return RGH;
        else return HOSPITAL;
      })
    );
    setLayout(newLayout);
  };
  const recommendHouse = () => {
    let maxPoints = 0;
    let recommendedHouse = "";

    layout.forEach((row, rowIndex) => {
      row.forEach((plot, colIndex) => {
        if (plot === HOUSE) {
          let points = 0;

          if (rowIndex > 0 && layout[rowIndex - 1][colIndex]) points++;
          if (rowIndex < layout.length - 1 && layout[rowIndex + 1][colIndex])
            points++;
          if (colIndex > 0 && layout[rowIndex][colIndex - 1]) points++;
          if (colIndex < row.length - 1 && layout[rowIndex][colIndex + 1])
            points++;
          if (
            rowIndex > 0 &&
            colIndex > 0 &&
            layout[rowIndex - 1][colIndex - 1]
          )
            points++;
          if (
            rowIndex > 0 &&
            colIndex < row.length - 1 &&
            layout[rowIndex - 1][colIndex + 1]
          )
            points++;
          if (
            rowIndex < layout.length - 1 &&
            colIndex > 0 &&
            layout[rowIndex + 1][colIndex - 1]
          )
            points++;
          if (
            rowIndex < layout.length - 1 &&
            colIndex < row.length - 1 &&
            layout[rowIndex + 1][colIndex + 1]
          )
            points++;

          if (points > 0) {
            if (layout[rowIndex][colIndex] === RESTAURANT) points += 2;
            if (layout[rowIndex][colIndex] === GYM) points += 3;
            if (layout[rowIndex][colIndex] === HOSPITAL) points += 4;
            if (layout[rowIndex][colIndex] === HOSGYM) points += 7;
            if (layout[rowIndex][colIndex] === RESHOS) points += 6;
            if (layout[rowIndex][colIndex] === RESGYM) points += 5;
            if (layout[rowIndex][colIndex] === RGH) points += 9;
          }

          if (points > maxPoints) {
            maxPoints = points;
            recommendedHouse = `House no ${rowIndex}${colIndex}    [ row-Index: ${rowIndex} , column-Index ${colIndex} ]`;
          }
        }
      });
    });

    if (recommendedHouse) {
      setRecommendation(recommendedHouse);
    } else {
      setRecommendation("No suitable house found");
    }
  };

  const instruction = () => {
    alert(`Welcome to the Housing Layout interface:

    1. Please begin by configuring the layout based on your preferences for rows and columns by entering the respective values.
    
    2. Once configured, you will be presented with an interface corresponding to the specified rows and columns.
    
    3. Assign each plot in the layout with one of the following options:
       a. House
       b. Restaurant
       c. Gym
       d. Hospital
    
    4. Utilize the UI button to receive recommendations for the optimal house selection.
    
    Thank you for using the Housing Layout system. If you have any further questions or need assistance, feel free to ask.`);
  };

  return (
    <div>
      <div className="header">
        <h2>
          <u>Housing Layout</u>
        </h2>
        <h4 onClick={instruction}>
          <u>Instructons</u>
        </h4>
      </div>
      <div className="setBox">
        <label>Rows: </label>
        <input type="number" onChange={(e) => setRows(e.target.value)} />
        <label>Columns: </label>
        <input type="number" onChange={(e) => setColumns(e.target.value)} />

        <button type="button" onClick={createLayout}>
          Generate layout
        </button>
      </div>
      <button type="button" onClick={createLayout}>
        Reset Layout
      </button>
      <button type="button" onClick={generateRandomLayout}>
        Generate Random Layout
      </button>

      <div className="setlayout">
        {layout.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((plot, colIndex) => (
              <select
                key={colIndex}
                onChange={(e) => assignPlot(rowIndex, colIndex, e.target.value)}
                value={plot || ""}
              >
                <option value="">{null}</option>
                <option value={HOUSE}>
                  {HOUSE}
                  {rowIndex}
                  {colIndex}
                </option>
                <option value={RESTAURANT}>{RESTAURANT}</option>
                <option value={GYM}>{GYM}</option>
                <option value={HOSPITAL}>{HOSPITAL}</option>
                <option value={HOSGYM}>
                  {HOSPITAL} / {GYM}
                </option>
                <option value={RESHOS}>
                  {RESTAURANT} / {HOSPITAL}
                </option>
                <option value={RESGYM}>
                  {RESTAURANT} / {GYM}
                </option>
                <option value={RGH}>
                  {RESTAURANT} / {GYM} / {HOSPITAL}
                </option>
              </select>
            ))}
          </div>
        ))}
      </div>
      <button onClick={recommendHouse}>Recommend House</button>
      <div>
        <h3>
          Recommendation: <u>{recommendation}</u>
        </h3>
      </div>
    </div>
  );
};

export default App;
