interface colorMakerI {background:string; color: string}

const modeColorMaker = (mode: string):colorMakerI => {
  let modeColorObj = {} as colorMakerI;
  if(mode === "dark"){
    modeColorObj = {background: "#1b1b1d", color: "#fbfbfd"}
  }else if(mode === "white"){
    modeColorObj = {background: "#f6f7f2", color: "#383935"}
  }else if(mode === "brown"){
    modeColorObj = {background: "#DCD1C6", color: "#4A453E"}
  }
  return modeColorObj
}

export default modeColorMaker;