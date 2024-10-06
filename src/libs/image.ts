
export const getRandomImageUrl = (width: number = 1000, height: number = 1200) => {
    return `https://picsum.photos/${width}/${height + Math.floor(Math.random() * 100)}`
}