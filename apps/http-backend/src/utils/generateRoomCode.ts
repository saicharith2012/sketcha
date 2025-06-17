export default function generateRoomCode(length: number): string {
  let code = "";
  const valueString =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  while (length > 0) {
    code += valueString[Math.floor(Math.random() * valueString.length)];
    length--;
  }
  return code;
}
