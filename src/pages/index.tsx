import { db } from "../db";
import mock from "../data/mock/animeStats.json";

export default function Home() {
  async function addFriend() {
    try {
      await db.stats.add({
        username: "triplezko",
        type: "anime",
        data: mock,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1>Home</h1>
      <button onClick={addFriend}>Add</button>
    </>
  );
}
