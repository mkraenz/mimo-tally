export const amountToColor = (amount: number) =>
  amount < 0 ? "red.fg" : amount > 0 ? "green.fg" : undefined;
