let s = "10";

let n = +s + 1;

// s = String(n);
console.log(s.padStart(2, "0"));

console.log("\n*******************************\n");

process.stdout.write("Hello");
console.log();
process.stdout.write("World");

let state = 0;

for (let i = 0; i < 5; i++) {
  n = state += 1;
  console.log(n, state);
}
