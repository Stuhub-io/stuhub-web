
export const compareRoute = (pathName: string, route: string) => {
  if (pathName === route) return true
  const paths = pathName.split('/')
  const routeParts = route.split('/')

  if (paths.length !== routeParts.length) return false
  
  for (let i = 0; i < paths.length; i++) {
    if (routeParts[i] === '*') continue
    if (paths[i] !== routeParts[i]) return false
  }
  return true
}