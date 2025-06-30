/* Amplify Params - DO NOT EDIT
  ENV
  REGION
  STORAGE_COMPLAINTS_ARN
  STORAGE_COMPLAINTS_NAME
  STORAGE_COMPLAINTS_STREAMARN
Amplify Params - DO NOT EDIT */
const https = require("https");

exports.handler = async (event) => {
  console.log("📨 Event received:", JSON.stringify(event));

  if (!event.body) {
    console.warn("❌ Missing request body");
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Missing request body" }),
    };
  }

  let body;
  try {
    body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
  } catch (err) {
    console.error("❌ JSON parse error:", err);
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Invalid JSON in request body" }),
    };
  }

  const { name, email, product, category, complaint, turnstileToken } = body;

  if (!name || !email || !product || !category || !complaint || !turnstileToken) {
    console.warn("❌ Missing required fields or CAPTCHA token");
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Missing required fields or CAPTCHA token" }),
    };
  }

  const secret = process.env.TURNSTILE_SECRET_KEY;
  const postData = `secret=${secret}&response=${turnstileToken}`;

  const verifyToken = () =>
    new Promise((resolve, reject) => {
      const options = {
        hostname: "challenges.cloudflare.com",
        path: "/turnstile/v0/siteverify",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": postData.length,
        },
      };

      const req = https.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
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
      console.warn("🚫 CAPTCHA verification failed");
      return {
        statusCode: 403,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "CAPTCHA verification failed" }),
      };
    }

    // 🔍 Custom CloudWatch Analytics Logging
    console.info("✅ Complaint verified and received:", {
      user: email,
      category,
      product,
      timestamp: new Date().toISOString(),
    });

    // Placeholder for future DynamoDB or S3 storage logic
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Complaint submitted successfully!",
        received: { name, email, product, category, complaint },
      }),
    };
  } catch (error) {
    console.error("❌ CAPTCHA verification error:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Server error during CAPTCHA validation" }),
    };
  }
};
