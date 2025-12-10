export function random(len:number)
{
    const option = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    let length = option.length;
    for (let i = 0; i < len; i++) {
      result += option[Math.floor(Math.random() * option.length)];
    }
    return result;
}