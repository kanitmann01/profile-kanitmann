const dataPath = new URL("../data/fable5.ts", import.meta.url).href;
console.log("Data path:", dataPath);

try {
  const mod = await import(dataPath);
  console.log("Import successful!");
  console.log("Keys:", Object.keys(mod));
  if (mod.fable5Sites) {
    console.log("Number of sites:", mod.fable5Sites.length);
  }
} catch (error) {
  console.error("Import failed:", error);
}
