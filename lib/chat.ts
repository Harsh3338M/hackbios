import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';

// 1. Define your API Key. 
// In a real application, you would load this from an environment variable 
// (e.g., process.env.MY_CUSTOM_API_KEY) or a secret manager.
const MY_GEMINI_API_KEY = "AIzaSyDNKkIPOi0WRJMqeCRFm16YB4sN8czr1kg"; 

// 2. Create a custom provider instance using createGoogleGenerativeAI
// and pass the apiKey in the configuration object.
const google = createGoogleGenerativeAI({
  apiKey: MY_GEMINI_API_KEY,
});

/**
 * Generates a vegetarian lasagna recipe using the custom configured Gemini model.
 * @returns {Promise<string>} The generated recipe text.
 */
const getText = async () => {
  try {
    const { text } = await generateText({
      // Use the custom configured 'google' instance here
      model: google('gemini-2.5-flash'), 
      prompt: 'generate a statement about export 300 words',
    });

    return text;
  } catch (error) {
    console.error("Error generating text:", error);
    // Return a fallback message in case of API failure
    return "Failed to generate recipe. Please check your API key and connection.";
  }
};

export { getText };