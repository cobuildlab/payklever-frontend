const validName = /^.{6,40}$/;
const validDescription = /^.{10,60}$/;
const validType = /\b(sc|ac)\b/;
const validAmount = /^[0-9]{1,5}$/;

export { validName, validDescription, validType, validAmount };
