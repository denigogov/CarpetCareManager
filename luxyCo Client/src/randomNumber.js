// RandomStringGenerator.js
const allCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
];

function getRandomCharacter() {
  const randomIndex = Math.floor(Math.random() * allCharacters.length);
  return allCharacters[randomIndex];
}

export function randomNumber(length) {
  let randomString = '';
  for (let i = 0; i < length; i++) {
    randomString += getRandomCharacter();
  }
  return randomString;
}
