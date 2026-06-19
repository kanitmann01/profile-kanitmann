console.log("1. import.meta.url:", import.meta.url);
const dataPath = new URL("../data/fable5.ts", import.meta.url).href;
console.log("2. dataPath:", dataPath);
console.log("3. Attempting import...");
try {
  const mod = await import(dataPath);
  console.log("4. Import succeeded");
  console.log("5. fable5Sites:", mod.fable5Sites?.length);
} catch (error: any) {
  console.error("6. Import failed:", error.message);
}
console.log("7. Done");
