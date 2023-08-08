
export const ManipulateTheQuery = async (query, inputData) => {
    let result = query.slice(1);
    const translationregex = /['"]([^'"]+)['"]/g;
    const matches = inputData.match(translationregex);
    console.log(matches)
    let translation = matches ? matches[0].slice(1, -1) : null;
    console.log(translation);
    if (translation == null){
        return "Did you really include quotes(\", ') ?"
    }
    
    let modifiedQuery1 ="";
    let finalquery ='';

    let extractedstring = '';
    let startDelimiter = '?';
    const endDelimiter1 = ' ';
    const endDelimiter2 = '\n'
    const startIndex = result.indexOf(startDelimiter);
    console.log("Start pos: ", startIndex); 
    const endIndex1 = result.indexOf(endDelimiter1, startIndex + startDelimiter.length);
    console.log("For space: ", endIndex1);
    const endIndex2 = result.indexOf(endDelimiter2, startIndex + startDelimiter.length);
    console.log("For new line: ", endIndex2);
    let endDelimiter;
    if(endIndex2 == -1)
    {
        endDelimiter = endIndex1;
    }
    else
    {
        endDelimiter = Math.min(endIndex1, endIndex2);
    }
    
    console.log("End pos: ", endDelimiter);
    if (startIndex !== -1 && endDelimiter !== -1) {
        extractedstring = result.slice(startIndex + startDelimiter.length, endDelimiter);
        if (extractedstring != 's') {
            extractedstring = 's';
            result =result.slice(0, startIndex+1) + extractedstring + ' ' +result.slice(endDelimiter + 1);
            //console.log(result)
        }
        
            console.log(extractedstring)
    } 
    else {
        console.log("Not found!")
    }

    const graphURI = 'http://www.harshil.org/pythonscriptdata/graph';
    const modifiedQuery = result.replace('WHERE', `FROM <${graphURI}> WHERE`);
    const regex = /{([^}]+)}/g;
    let quotedData = "FILTER (regex(STR(?o), '" + translation + "', 'i'))"
    //let quotedData = "FILTER (STRSTARTS(?o, '„') && STRENDS(?o, '" + translation + "“'))\n"
    console.log(quotedData);
    
    if(inputData.toLowerCase().includes('author') || inputData.toLowerCase().includes('fragment')){
        // expression to match "category" as standalone words (case-insensitive)
        finalquery = "\n   ?" +extractedstring + " <http://127.0.0.1:10214/AuthorAndFragment> ?o .\n" + quotedData;
        modifiedQuery1= modifiedQuery.replace(regex, (match, content) => `{${finalquery}}`);
        console.log(modifiedQuery1);
    }    
    else if (/\ben(glish)?\b/gi.test(modifiedQuery)) {
        // Regular expression to match "en" or "english" as standalone words (case-insensitive)
        finalquery = "\n   ?" +extractedstring + " <http://127.0.0.1:10214/EnglishTranslation> ?o .\n" + quotedData;
        modifiedQuery1= modifiedQuery.replace(regex, (match, content) => `{${finalquery}}`);
        console.log(modifiedQuery1);
    }
    else if (/\bid?\b/gi.test(modifiedQuery)) {
        // Regular expression to match "id" as standalone words (case-insensitive)
        finalquery = "\n   ?" +extractedstring + " <http://127.0.0.1:10214/ID> ?o .\n" + quotedData;
        modifiedQuery1= modifiedQuery.replace(regex, (match, content) => `{${finalquery}}`);
        console.log(modifiedQuery1);
    }
    else if (/\b(de|deutsch|deutsche|german)\b/gi.test(modifiedQuery)) {
        // Regular expression to match "de" or "deutsche" or "german" as standalone words (case-insensitive)
        finalquery = "\n   ?" +extractedstring + " <http://127.0.0.1:10214/GermanTranslation> ?o .\n" + quotedData;
        modifiedQuery1= modifiedQuery.replace(regex, (match, content) => `{${finalquery}}`);
        console.log(modifiedQuery1);
    }
    else if(inputData.toLowerCase().includes('category')){
        // expression to match "category" as standalone words (case-insensitive)
        finalquery = "\n   ?" +extractedstring + " <http://127.0.0.1:10214/Category> ?o .\n" + quotedData;
        modifiedQuery1= modifiedQuery.replace(regex, (match, content) => `{${finalquery}}`);
        console.log(modifiedQuery1);
    }
    else if(inputData.toLowerCase().includes('italian')){
        // expression to match "category" as standalone words (case-insensitive)
        finalquery = "\n   ?" +extractedstring + " <http://127.0.0.1:10214/ItalianTranslation> ?o .\n" + quotedData;
        modifiedQuery1= modifiedQuery.replace(regex, (match, content) => `{${finalquery}}`);
        console.log(modifiedQuery1);
    }
    else if(inputData.toLowerCase().includes('literature')){
        // expression to match "category" as standalone words (case-insensitive)
        finalquery = "\n   ?" +extractedstring + " <http://127.0.0.1:10214/Literature> ?o .\n" + quotedData;
        modifiedQuery1= modifiedQuery.replace(regex, (match, content) => `{${finalquery}}`);
        console.log(modifiedQuery1);
    }
    else if(inputData.toLowerCase().includes('volume')){
        // expression to match "category" as standalone words (case-insensitive)
        finalquery = "\n   ?" +extractedstring + " <http://127.0.0.1:10214/Volume> ?o .\n" + quotedData;
        modifiedQuery1= modifiedQuery.replace(regex, (match, content) => `{${finalquery}}`);
        console.log(modifiedQuery1);
    }
    else if(inputData.toLowerCase().includes('annotation')){
        // expression to match "category" as standalone words (case-insensitive)
        finalquery = "\n   ?" +extractedstring + " <http://127.0.0.1:10214/Annotation> ?o .\n" + quotedData;
        modifiedQuery1= modifiedQuery.replace(regex, (match, content) => `{${finalquery}}`);
        console.log(modifiedQuery1);
    }
    else{
        modifiedQuery1 = "We had some trouble generating the query. Click on the icon for guidelines"
    }

    //console.log("Final Query: " + modifiedQuery1);
    return modifiedQuery1


}