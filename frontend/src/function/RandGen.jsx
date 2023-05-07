const getTimeStamp = () => {
  var TimeStamp = Date.now();
  return TimeStamp;
}

const UID = () => {
  var TimeStamp = Date.now();
  var HexNumber = (Math.random()).toString(16).split('.')[1];

  return `${TimeStamp}-${HexNumber}`;
}

export { getTimeStamp, UID }