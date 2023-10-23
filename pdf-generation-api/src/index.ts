import express from "express";
import createTemplate from "./create-template";

const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
    // Calling the template render func with dynamic data
    console.log(req.body);
    
    const result = await createTemplate(req.body);
  
    // Setting up the response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=export.pdf`);
  
    // Streaming our resulting pdf back to the user
    result.pipe(res);
});

const port = 3000;
app.listen(port, () => {
  console.log(`The sample PDF app is running on port ${port}.`);
});
