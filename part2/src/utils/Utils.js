
export const getRandomSixNumber = () => {
    const numberArray = [];

    while(numberArray.length < 6) {
        const number = (Math.floor(Math.random() * 45)) + 1;
        const hasNumber = numberArray.filter((prev) => prev === number).length > 0;
    
        if(!hasNumber) numberArray.push(number);
    }

    return numberArray.sort((numA, numB) => numA - numB); // 오름차순 나열
}