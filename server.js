app.post("/webhook/orders", async (req, res) => {
  try {
    const order = req.body;
    console.log("ORDER:", JSON.stringify(order, null, 2));

    for (const item of order.line_items) {
      console.log("Sende an API:", item.sku, item.quantity);

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
    }

    res.send("OK");
  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).send("Error");
  }
});
