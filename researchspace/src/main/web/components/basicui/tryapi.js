export const performOperations = async (inputData) => {
    const apiKey = '24afa8ea-3019-49fd-b0d9-d6059883ca40';
    const url = 'https://api.deepai.org/api/text-generator';
    const textData = inputData;

   /* try {
        const response = await fetch(url, {
            method: 'POST',
            body: new URLSearchParams({ text: textData }),
            headers: {
                'api-key': apiKey,
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        //console.log(data['output'])
        return data['output'];
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    } */
    const data = "PREFIX testtest";
        //console.log(data['output'])
    return data;

}
export default performOperations;