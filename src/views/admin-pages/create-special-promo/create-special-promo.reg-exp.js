const validName = /^.{6,40}$/;
const validDescription = /^.{10,60}$/;
const validAmount = /(?:\b|-)([1-9]{1,2}[0]?|100)\b/;

export { validName, validDescription, validAmount };
