import { fetchAuthSession } from 'aws-amplify/auth';

export const getComplaints = async () => {
  const apiUrl = "https://9oi8ex6sz5.execute-api.us-east-1.amazonaws.com/dev/complaints"; // endpoint to implement

  const session = await fetchAuthSession();
  const token = session.tokens?.idToken?.toString();

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: { Authorization: token },
  });

  if (!response.ok) throw new Error("Failed to fetch complaints");
  return response.json();
};
