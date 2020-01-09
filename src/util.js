export const uniqueId = () => {
    const currentTime = (new Date()).getTime()
    const shuffle = (array) => array.sort(() => Math.random() - 0.5);

    return shuffle( `${currentTime}`.split('') ).join('')
}