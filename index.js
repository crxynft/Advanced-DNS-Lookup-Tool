const dns = require("dns");

const domain = process.argv[2];

if (!domain) {
  console.error("\n❌ Please provide a domain.\nUsage: node lookup.js example.com");
  process.exit(1);
}

console.log(`\n🔍 Looking up: ${domain}\n`);

dns.lookup(domain, { all: true }, (err, addresses) => {
  if (err) {
    console.error("❌ Lookup Error:", err.message);
    process.exit(1);
  }
  console.log("🌐 IP Addresses:");
  addresses.forEach((addr) => {
    console.log(`- ${addr.family === 6 ? "IPv6" : "IPv4"}: ${addr.address}`);
  });

  dns.resolve(domain, (err, records) => {
    if (!err) {
      console.log("\n📄 DNS A Records:");
      records.forEach(record => console.log(`- ${record}`));
    }
  });

  dns.resolveMx(domain, (err, records) => {
    if (!err && records.length) {
      console.log("\n📬 MX Records:");
      records.forEach(record => console.log(`- ${record.exchange} (priority: ${record.priority})`));
    }
  });

  dns.resolveNs(domain, (err, records) => {
    if (!err && records.length) {
      console.log("\n🏛️ NS Records:");
      records.forEach(record => console.log(`- ${record}`));
    }
  });

  dns.resolveCname(domain, (err, records) => {
    if (!err && records.length) {
      console.log("\n🔗 CNAME Records:");
      records.forEach(record => console.log(`- ${record}`));
    }
  });
});
