export async function getQuote() {
  try {
    const response = await fetch("https://favqs.com/api/qotd");
    const data = await response.json();
    const quote = data.quote;
    return quote;
  } catch (error) {
    console.log("Error fetching data", error);
    return null;
  }
}
