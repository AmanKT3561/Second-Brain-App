export const random = (len: number): string => {
  const option = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < len; i++) {
    result += option[Math.floor(Math.random() * option.length)];
  }
  return result;
};
