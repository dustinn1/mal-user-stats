import { promises } from "fs";

export async function fileExists(path: string) {
  try {
    await promises.access(path);
    return true;
  } catch {
    return false;
  }
}
