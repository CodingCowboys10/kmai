import React from 'react';
import { Properties } from 'csstype';

interface MenuProps {
  model: number;
  handleClickMenu: (index: number) => void;
}

function Menu ({ model, handleClickMenu }: MenuProps) {
  const models = ["llama2", "openChat", "mistral", "starling", "openAi"];

  const buttonStyle: Properties = {
    margin: "1em"

  };

  const buttonStyleIndex: Properties = {
        margin: "1em",
        border : "1px solid white"
  };

  return (
    <div className="flex flex-col absolute right-40 top-40" style={{borderRadius: "10px" , border: "solid" , padding:"1em"}}>
      Choose a LLM
      {models.map((value, index) => (
        <button key={index} id={value} onClick={() => handleClickMenu(index)}
            style={index === model ? buttonStyleIndex : buttonStyle} >
          {value}
        </button>
      ))}
    </div>
  );
}

export default Menu;

