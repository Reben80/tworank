import type { ScoreWeights, LockedWeights } from '../types';

export function redistributeWeights(
  currentWeights: ScoreWeights,
  locks: LockedWeights,
  changedKey: keyof ScoreWeights,
  newValue: number
): ScoreWeights {
  // If the weight is locked, don't allow changes
  if (locks[changedKey]) {
    return currentWeights;
  }

  // Calculate total locked weights (excluding the changed one)
  const lockedTotal = Object.entries(currentWeights).reduce((sum, [key, value]) => {
    if (key === changedKey || !locks[key as keyof LockedWeights]) return sum;
    return sum + value;
  }, 0);

  // Calculate maximum allowed value for the changed weight
  const maxAllowed = 1 - lockedTotal;
  
  // Clamp the new value to ensure it doesn't exceed available space
  const clampedValue = Math.min(maxAllowed, Math.max(0, newValue));

  // If the value would exceed available space, keep original weights
  if (clampedValue !== newValue) {
    return currentWeights;
  }

  const newWeights = { ...currentWeights };
  newWeights[changedKey] = clampedValue;

  // Get unlocked weights except the changed one
  const unlockedKeys = Object.keys(currentWeights).filter(
    key => key !== changedKey && !locks[key as keyof LockedWeights]
  ) as Array<keyof ScoreWeights>;

  if (unlockedKeys.length === 0) {
    return currentWeights;
  }

  // Distribute remaining weight
  const remaining = 1 - clampedValue - lockedTotal;
  const sharePerWeight = remaining / unlockedKeys.length;

  unlockedKeys.forEach(key => {
    newWeights[key] = sharePerWeight;
  });

  return newWeights;
}