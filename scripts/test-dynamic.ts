const dataPath = new URL("../data/fable5.ts", import.meta.url).href;
console.log("Attempting to import:", dataPath);

try {
  const mod = await import(dataPath);
  console.log("Success! Keys:", Object.keys(mod));
  console.log("fable5Sites:", mod.fable5Sites?.length);
} catch (error: any) {
  console.error("Failed:", error.message);
  console.error("Stack:", error.stack);
}
