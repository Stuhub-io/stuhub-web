export const getPrimaryTypoLevelBySize = (size: 'sm' | 'md' | 'lg' = 'md') => {
  if (size === 'sm') return 'p6'
  if (size === 'md') return 'p5'
  if (size === 'lg') return 'p4'
}

export const getSecondaryTypoLevelBySize = (size: 'sm' | 'md' | 'lg' = 'md') => {
  if (size === 'sm') return 'p7'
  if (size === 'md') return 'p6'
  if (size === 'lg') return 'p5'
}
