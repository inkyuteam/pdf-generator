const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const port = 3001;
const cors = require('cors'); // Import the cors module

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

app.post('/generate-pdf', async (req, res) => {
  const pageContent = req.body.pageContent;
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setContent(pageContent);
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true
  });
  await browser.close();

  res.setHeader("Content-Type", "application/pdf");  
  res.setHeader('Content-Disposition', 'attachment; filename="generated.pdf"');

  res.send(pdf);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
