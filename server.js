const express = require("express");

const app = express();
app.use(express.json());

app.post("/webhook/orders", async (req, res) => {
  try {
    const order = req.body;
    console.log("ORDER:", JSON.stringify(order, null, 2));

    if (!order.line_items) {
      console.log("Keine line_items gefunden");
      return res.status(200).send("No items");
    }

    for (const item of order.line_items) {
      console.log("Sende an API:", item.sku, item.quantity);

      if (!item.sku) {
        console.log("⚠️ SKU fehlt → übersprungen");
        continue;
      }

      try {
        const response = await fetch("https://api.preprod.imbretex-preprod.hegyd.net/api", {
          method: "POST",
          headers: {
            "Authorization": "Bearer 5yQ8UIMT|7.897oCT8F_:MieHHR2FK:rEZRs+lkoiM6GRE^:NM^4tHGy2K*",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            reference: item.sku,
            quantity: item.quantity
          })
        });

        const text = await response.text();
        console.log("API RESPONSE:", text);

      } catch (apiError) {
        console.error("❌ API ERROR:", apiError);
      }
    }

    res.status(200).send("OK");

  } catch (err) {
    console.error("❌ SERVER ERROR:", err);
    res.status(500).send("Error");
  }
});

app.get("/", (req, res) => {
  res.send("Server läuft");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server läuft auf Port " + PORT);
});
