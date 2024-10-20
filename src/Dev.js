import { React, useEffect } from "react";

export default function Dev() {
  async function test() {
    try {
      const response = await fetch("https://favqs.com/api/qotd");
      const data = await response.json();
      console.log(data.quote.body);
    } catch (er) {
      console.log("Error fetching data", er);
    }
  }
  useEffect(() => {
    test();
  }, []);
}
