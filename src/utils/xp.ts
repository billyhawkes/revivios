export const XPAmounts = {
  task: 10,
};

export const getMaxXp = (level: number) => {
  return level * 100;
};

export const getNewXPLevel = ({
  xp,
  level,
  change,
}: {
  xp: number;
  level: number;
  change: number;
}) => {
  const maxXp = getMaxXp(level);
  if (xp + change > maxXp) {
    return { xp: xp + change - maxXp, level: level + 1 };
  } else if (xp + change < 0) {
    return { xp: getMaxXp(level - 1) - (xp + change), level: level - 1 };
  } else {
    return { xp: xp + change, level };
  }
};
