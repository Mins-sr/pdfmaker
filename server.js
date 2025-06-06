const express = require('express');
const multer = require('multer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/upload', upload.single('quote'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  const uploadedPath = req.file.path;
  const doc = new PDFDocument();
  const filename = 'order_form.pdf';

  res.setHeader('Content-Disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-Type', 'application/pdf');

  doc.fontSize(25).text('注文書 (Purchase Order)', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`This purchase order corresponds to file: ${req.file.originalname}`);
  doc.moveDown();
  doc.text('Thank you for your business.');

  doc.pipe(res);
  doc.end();

  fs.unlink(uploadedPath, err => {
    if (err) console.error(err);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
