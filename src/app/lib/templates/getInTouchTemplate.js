export function getInTouchTemplate({ email }) {
  const safeEmail = email?.trim() || "—";

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>QTS Get In Touch</title>
    <style>
      body {
        font-family: 'Segoe UI', Roboto, Arial, sans-serif;
        background-color: #f6f6f6;
        padding: 40px 0;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: auto;
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        overflow: hidden;
      }
      .header {
        background: #F58321;
        color: #fff;
        text-align: center;
        padding: 24px;
      }
      .header img {
        max-width: 160px;
        margin-bottom: 10px;
      }
      .content {
        padding: 28px 32px;
      }
      h2 {
        margin: 0 0 16px;
        color: #222;
        font-size: 20px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      td {
        padding: 8px 0;
        vertical-align: top;
      }
      td.label {
        width: 130px;
        font-weight: 600;
        color: #555;
      }
      td.value {
        color: #111;
      }
      .footer {
        background: #f4f4f4;
        text-align: center;
        font-size: 13px;
        color: #777;
        padding: 16px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>New Get In Touch Submission</h1>
      </div>
      <div class="content">
        <h2>Subscriber Details</h2>
        <table>
          <tr><td class="label">Email:</td><td class="value">${safeEmail}</td></tr>
        </table>
      </div>
      <div class="footer">
        © ${new Date().getFullYear()} Quality Team Solution (QTS)  
        | Business Bay, Dubai, UAE  
        Copyright 2025 Quality Team Solution (QTS)
      </div>
    </div>
  </body>
  </html>`;
}
