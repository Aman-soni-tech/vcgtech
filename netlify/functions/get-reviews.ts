import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

  if (!appsScriptUrl) {
    console.error('Missing GOOGLE_APPS_SCRIPT_URL environment variable');
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server configuration error.' }),
    };
  }

  try {
    // Forward the request to Google Apps Script
    // Append a query param to tell Apps Script what we want
    const response = await fetch(`${appsScriptUrl}?action=getReviews`, {
      method: 'GET',
    });

    const result = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
