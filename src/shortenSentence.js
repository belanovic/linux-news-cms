export default function shortenSentence(sentence, numChars) {
    if(sentence === undefined) return sentence;
    let lengthSentence = sentence.length;

    if(lengthSentence < numChars) {
        return sentence;
    }

    const arrSentence = sentence.split(' ');

    while(lengthSentence > numChars) {
        arrSentence.pop();
        const rejoinedSentence = arrSentence.join(' ');
        lengthSentence = rejoinedSentence.length;
    }
    const joinedArrSentence = arrSentence.join(' ');
    const dots = sentence.length > numChars? '...' : '';
    return joinedArrSentence + dots
}