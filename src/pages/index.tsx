import axios from "axios";
export default function Home() {
  function makeRequest() {
    axios
      .get("https://example.com/some-path")
      .then((res) => {
        const data = res.data;
        console.log(data);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.status);
        }
      });
  }
  makeRequest();

  return (
    <>
      <h1>Home</h1>
    </>
  );
}
