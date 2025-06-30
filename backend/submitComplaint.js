const https = require("https");

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const { name, email, category, product, complaint, turnstileToken } = body;
  const secret = process.env.TURNSTILE_SECRET_KEY;

  const verifyToken = () =>
    new Promise((resolve, reject) => {
      const postData = `secret=${secret}&response=${turnstileToken}`;
      const options = {
        hostname: "challenges.cloudflare.com",
        path: "/turnstile/v0/siteverify",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(postData),
        },
      };

      const req = https.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          try {
            const result = JSON.parse(data);
            resolve(result.success);
          } catch (err) {
            reject(err);
          }
        });
      });

      req.on("error", reject);
      req.write(postData);
      req.end();
    });

  try {
    const isHuman = await verifyToken();

    if (!isHuman) {
      return {
        statusCode: 403,
        body: JSON.stringify({ message: "❌ CAPTCHA verification failed." }),
      };
    }

    // Optional: Log the data or forward to DB
    console.log("✅ Complaint received:", { name, email, category, product, complaint });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "✅ Complaint submitted successfully." }),
    };
  } catch (error) {
    console.error("Error during CAPTCHA verification:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "❌ Server error during CAPTCHA verification." }),
    };
  }
};
