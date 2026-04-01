const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

app.post("/webhook/orders", async (req, res) => {
  try {
    const order = req.body;

    for (const item of order.line_items) {
      await fetch("https://api.preprod.imbretex-preprod.hegyd.net/api", {
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
    }

    res.send("OK");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.listen(3000, () => console.log("läuft"));
