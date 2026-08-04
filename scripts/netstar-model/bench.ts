import { classifyUrl } from "../../lib/netstar/classify";

const samples = [
  "https://paypal.com/login",
  "http://netflix.com",
  "http://192.168.1.1/bank/login",
  "http://paypal-account-verify.com/login",
  "https://www.chase.com/",
  "http://karliki.com",
  "https://github.com/login",
];

const t0 = performance.now();
for (const u of samples) {
  const r = classifyUrl(u);
  console.log(
    u.padEnd(45),
    r.verdict.padEnd(12),
    (r.confidence * 100).toFixed(1) + "%",
    r.latencyMs.toFixed(2) + "ms"
  );
}
console.log("total:", (performance.now() - t0).toFixed(1) + "ms");
