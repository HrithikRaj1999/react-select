import React, { useEffect, useLayoutEffect, useState } from "react";
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";

interface optionsType {
  value: string;
  label: string;
}

function App() {
  const [options, setOptions] = useState<optionsType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<optionsType[]>([]);
  // console.log(initialData);
  // let initialData = [
  //   {
  //     value: "site 1",
  //     label: "site 1",
  //   },
  //   {
  //     value: "site 2",
  //     label: "site 2",
  //   },
  //   {
  //     value: "site 3",
  //     label: "site 3",
  //   },
  // ];
  useEffect(() => {
    setIsLoading(true);
    const initData = localStorage.getItem("initData");
    if (initData) {
      try {
        const parsedData = JSON.parse(initData).map((item: optionsType) => {
          return { label: item.label, value: item.value };
        });
        setInitialData(parsedData);
        setOptions(parsedData);
        console.log({ pfad: parsedData });
      } catch (error) {
        console.error("Error parsing initData:", error);
      }
    } else {
      // Handle the case where no data is found in localStorage
      console.log("No initData found in localStorage");
    }
    setIsLoading(false);
  }, []);

  const animatedComponents = makeAnimated();
  console.log("last line", initialData);
  const customStyles = {
    container: (provided: any) => ({
      ...provided,
      width: 350,
    }),
  };
  return (
    <div className="App">
      <CreatableSelect
        styles={customStyles}
        isMulti
        openMenuOnClick={false}
        isClearable
        components={animatedComponents}
        defaultValue={options} // Set the default value with an array of options
        options={options}
        onChange={(currValueInBox) => {
          setOptions([...currValueInBox]);
        }}
      />
      <button
        style={{ margin: "3vh" }}
        onClick={() =>
          localStorage.setItem("initData", JSON.stringify(options))
        }
      >
        Save
      </button>
    </div>
  );
}

export default App;
