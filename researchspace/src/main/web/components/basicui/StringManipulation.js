
export const ManipulateTheQuery = async (query, inputData) => {
    let result = query.slice(1);
    let leftPart = null;
    let rightPart = null;

    //Finding data from the query
    let translation2 = null;
    const translationregex = /['"]([^'"]+)['"]/g;
    const matches = inputData.match(translationregex);
    console.log(matches)
    let translation1 = matches ? matches[0].slice(1, -1) : null;
    console.log(translation1);
    if(matches.length > 1){
        translation2 = matches ? matches[1].slice(1, -1) : null;
        console.log(translation2);
    }
    if (translation1 == null){
        return "Did you really include quotes(\", ') ?"
    }

    if(inputData.includes("and")){
        let parts = inputData.split("and");
        leftPart = parts[0].trim();
        rightPart = parts[1].trim();
        console.log("Left side:", leftPart);   
        console.log("Right side:", rightPart);
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
    let quotedData;
    //let quotedData = "FILTER (STRSTARTS(?o, '„') && STRENDS(?o, '" + translation + "“'))\n"
    console.log(quotedData);
    
    if(matches.length == 1){
        quotedData = "FILTER (regex(STR(?o1), '" + translation1 + "', 'i'))";
        if(inputData.toLowerCase().includes('author') || inputData.toLowerCase().includes('fragment')){
            // expression to match "category" as standalone words (case-insensitive)
            finalquery = "\n   ?" +extractedstring + " <http://127.0.0.1:10214/AuthorAndFragment> ?o1 .\n" + quotedData;
            modifiedQuery1= modifiedQuery.replace(regex, (match, content) => `{${finalquery}}`);
            console.log(modifiedQuery1);
        }    
        else if (/\ben(glish)?\b/gi.test(modifiedQuery) || inputData.toLowerCase().includes('english')) {
            // Regular expression to match "en" or "english" as standalone words (case-insensitive)
            finalquery = "\n   ?" +extractedstring + " <http://127.0.0.1:10214/EnglishTranslation> ?o1 .\n" + quotedData;
            modifiedQuery1= modifiedQuery.replace(regex, (match, content) => `{${finalquery}}`);
            console.log(modifiedQuery1);
        }
        else if (/\bid?\b/gi.test(modifiedQuery) || inputData.toLowerCase().includes('id')) {
            // Regular expression to match "id" as standalone words (case-insensitive)
            finalquery = "\n   ?" +extractedstring + " <http://127.0.0.1:10214/ID> ?o1 .\n" + quotedData;
            modifiedQuery1= modifiedQuery.replace(regex, (match, content) => `{${finalquery}}`);
            console.log(modifiedQuery1);
        }
        else if (/\b(de|deutsch|deutsche|german)\b/gi.test(modifiedQuery)) {
            // Regular expression to match "de" or "deutsche" or "german" as standalone words (case-insensitive)
            finalquery = "\n   ?" +extractedstring + " <http://127.0.0.1:10214/GermanTranslation> ?o1 .\n" + quotedData;
            modifiedQuery1= modifiedQuery.replace(regex, (match, content) => `{${finalquery}}`);
            console.log(modifiedQuery1);
        }
        else if(inputData.toLowerCase().includes('category')){
            // expression to match "category" as standalone words (case-insensitive)
            finalquery = "\n   ?" +extractedstring + " <http://127.0.0.1:10214/Category> ?o1 .\n" + quotedData;
            modifiedQuery1= modifiedQuery.replace(regex, (match, content) => `{${finalquery}}`);
            console.log(modifiedQuery1);
        }
        else if(inputData.toLowerCase().includes('italian')){
            // expression to match "category" as standalone words (case-insensitive)
            finalquery = "\n   ?" +extractedstring + " <http://127.0.0.1:10214/ItalianTranslation> ?o1 .\n" + quotedData;
            modifiedQuery1= modifiedQuery.replace(regex, (match, content) => `{${finalquery}}`);
            console.log(modifiedQuery1);
        }
        else if(inputData.toLowerCase().includes('literature')){
            // expression to match "category" as standalone words (case-insensitive)
            finalquery = "\n   ?" +extractedstring + " <http://127.0.0.1:10214/Literature> ?o1 .\n" + quotedData;
            modifiedQuery1= modifiedQuery.replace(regex, (match, content) => `{${finalquery}}`);
            console.log(modifiedQuery1);
        }
        else if(inputData.toLowerCase().includes('volume')){
            // expression to match "category" as standalone words (case-insensitive)
            finalquery = "\n   ?" +extractedstring + " <http://127.0.0.1:10214/Volume> ?o1 .\n" + quotedData;
            modifiedQuery1= modifiedQuery.replace(regex, (match, content) => `{${finalquery}}`);
            console.log(modifiedQuery1);
        }
        else if(inputData.toLowerCase().includes('annotation')){
            // expression to match "category" as standalone words (case-insensitive)
            finalquery = "\n   ?" +extractedstring + " <http://127.0.0.1:10214/Annotation> ?o1 .\n" + quotedData;
            modifiedQuery1= modifiedQuery.replace(regex, (match, content) => `{${finalquery}}`);
            console.log(modifiedQuery1);
        }
        else{
            modifiedQuery1 = "We had some trouble generating the query. Click on the icon for guidelines"
        }
    }
    


    if(matches.length>1){
        quotedData = "FILTER (regex(STR(?o1), '" + translation1 + "', 'i') && regex(STR(?o2), '" + translation2 + "', 'i'))";
        if(leftPart.toLowerCase().includes('author') || leftPart.toLowerCase().includes('fragment')){
            // expression to match "category" as standalone words (case-insensitive)
            finalquery = "\n   ?" +extractedstring + " <http://127.0.0.1:10214/AuthorAndFragment> ?o2 .\n" + quotedData;
            modifiedQuery1= modifiedQuery.replace(regex, (match, content) => `{${finalquery}}`);
            console.log(modifiedQuery1);
        }    
        else if (leftPart.toLowerCase().includes('english')) {
            // Regular expression to match "en" or "english" as standalone words (case-insensitive)
            finalquery = "\n   ?" +extractedstring + " <http://127.0.0.1:10214/EnglishTranslation> ?o2 .\n" + quotedData;
            modifiedQuery1= modifiedQuery.replace(regex, (match, content) => `{${finalquery}}`);
            console.log(modifiedQuery1);
        }
        else if (leftPart.toLowerCase().includes('id')) {
            // Regular expression to match "id" as standalone words (case-insensitive)
            finalquery = "\n   ?" +extractedstring + " <http://127.0.0.1:10214/ID> ?o2 .\n" + quotedData;
            modifiedQuery1= modifiedQuery.replace(regex, (match, content) => `{${finalquery}}`);
            console.log(modifiedQuery1);
        }
        else if (leftPart.toLowerCase().includes('german')) {
            // Regular expression to match "de" or "deutsche" or "german" as standalone words (case-insensitive)
            finalquery = "\n   ?" +extractedstring + " <http://127.0.0.1:10214/GermanTranslation> ?o2 .\n" + quotedData;
            modifiedQuery1= modifiedQuery.replace(regex, (match, content) => `{${finalquery}}`);
            console.log(modifiedQuery1);
        }
        else if(leftPart.toLowerCase().includes('category')){
            // expression to match "category" as standalone words (case-insensitive)
            finalquery = "\n   ?" +extractedstring + " <http://127.0.0.1:10214/Category> ?o2 .\n" + quotedData;
            modifiedQuery1= modifiedQuery.replace(regex, (match, content) => `{${finalquery}}`);
            console.log(modifiedQuery1);
        }
        else if(leftPart.toLowerCase().includes('italian')){
            // expression to match "category" as standalone words (case-insensitive)
            finalquery = "\n   ?" +extractedstring + " <http://127.0.0.1:10214/ItalianTranslation> ?o2 .\n" + quotedData;
            modifiedQuery1= modifiedQuery.replace(regex, (match, content) => `{${finalquery}}`);
            console.log(modifiedQuery1);
        }
        else if(leftPart.toLowerCase().includes('literature')){
            // expression to match "category" as standalone words (case-insensitive)
            finalquery = "\n   ?" +extractedstring + " <http://127.0.0.1:10214/Literature> ?o2 .\n" + quotedData;
            modifiedQuery1= modifiedQuery.replace(regex, (match, content) => `{${finalquery}}`);
            console.log(modifiedQuery1);
        }
        else if(leftPart.toLowerCase().includes('volume')){
            // expression to match "category" as standalone words (case-insensitive)
            finalquery = "\n   ?" +extractedstring + " <http://127.0.0.1:10214/Volume> ?o2 .\n" + quotedData;
            modifiedQuery1= modifiedQuery.replace(regex, (match, content) => `{${finalquery}}`);
            console.log(modifiedQuery1);
        }
        else if(leftPart.toLowerCase().includes('annotation')){
            // expression to match "category" as standalone words (case-insensitive)
            finalquery = "\n   ?" +extractedstring + " <http://127.0.0.1:10214/Annotation> ?o2 .\n" + quotedData;
            modifiedQuery1= modifiedQuery.replace(regex, (match, content) => `{${finalquery}}`);
            console.log(modifiedQuery1);
        }
        else{
            modifiedQuery1 = "We had some trouble generating the query. Click on the icon for guidelines"
        }

    }



    //console.log("Final Query: " + modifiedQuery1);
    return modifiedQuery1


}