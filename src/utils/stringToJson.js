export function extractJSONObjectFromString(inputString) {
  if (typeof inputString == "string") {
    const startIndex = inputString.indexOf("{");
    const endIndex = inputString.lastIndexOf("}") + 1;
    const jsonString = inputString.substring(startIndex, endIndex + 1);

    // console.log(jsonString);

    try { 
      const extractedJSONObject = JSON.parse(jsonString.trim());
      console.log(extractedJSONObject);
      return extractedJSONObject;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  }
}
