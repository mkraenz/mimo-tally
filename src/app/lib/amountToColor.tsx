export const amountToColor = (amount: number, otherUserIsPaying = false) => {
  if (otherUserIsPaying) return "red.fg";
  return amount < 0 ? "red.fg" : amount > 0 ? "green.fg" : undefined;
};
