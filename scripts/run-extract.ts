(async () => {
  const { extractAllMedia } = await import("./extract-fable5-media");
  try {
    await extractAllMedia();
  } catch (error) {
    console.error("Fatal error:", error);
    process.exit(1);
  }
})();
