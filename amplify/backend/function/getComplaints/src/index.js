/* Amplify Params - DO NOT EDIT
  ENV
  REGION
  STORAGE_COMPLAINTS_NAME
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  console.log("📥 Received event:", JSON.stringify(event));

  const tableName = process.env.STORAGE_COMPLAINTS_NAME;

  try {
    const params = {
      TableName: tableName,
    };

    const data = await docClient.scan(params).promise();
    const complaints = data.Items;

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Enable CORS
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify(complaints),
    };
  } catch (error) {
    console.error("❌ Error fetching complaints:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({ message: "Failed to fetch complaints" }),
    };
  }
};
