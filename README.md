# Gentle Mind Reflections - Mental Health Chatbot

A simple AI-powered mental health chatbot that provides personalized therapeutic conversations based on user preferences.

## How It Works

This application allows users to:
1. Choose their preferred therapy style (Balanced, Empathetic, Solution-focused)
2. Select topics of interest (Anxiety, Depression, Stress, etc.)
3. Chat with an AI that responds based on these preferences
4. Save their conversation history

## Project Structure

### Main Components

- **App.jsx**: Main entry point that sets up the routes and wraps the app with providers
- **ChatContainer.jsx**: Handles the chat interface and messages between user and AI
- **ChatPreferences.jsx**: Form for users to select their therapy preferences
- **Message.jsx**: Individual message component for chat bubbles
- **UserInput.jsx**: Text input area for users to type messages
- **MoodSelector.jsx**: Component for selecting the current mood

### Pages

- **ChatPage.jsx**: Page that displays the chat interface
- **PreferencesPage.jsx**: Page for customizing chat preferences
- **LandingPage.jsx**: Welcome page with app intro
- **OnboardingForm.jsx**: Initial user setup page
- **NotFound.jsx**: 404 error page

### Context (State Management)

- **ChatPreferencesContext.jsx**: Manages and provides user preferences across the app
- **ThemeContext.jsx**: Manages theme colors and dark/light mode

### Utilities

- **geminiService.js**: Handles communication with the Gemini AI API or provides fallback responses
- **reflectionData.js**: Contains predefined prompts and responses for different moods
- **exportUtils.js**: Functions for saving chat conversations
- **config.js**: Application configuration settings

## Features

- **Personalized Therapy Experience**: Different therapy styles affect AI responses
- **Topic Selection**: Focus on specific mental health topics
- **Mood-Based Responses**: AI adapts to user's current emotional state
- **Themed UI**: Interface changes based on selected therapy style
- **Conversation Export**: Save chat history as a text file

## Running the Application

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Access the application at http://localhost:8080

## Using the Gemini API (Optional)

1. Get an API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a `.env` file with:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
3. Restart the application

Without an API key, the app will use fallback responses to demonstrate functionality.

## Project info

**URL**: https://lovable.dev/projects/369a33cc-9055-4d25-bcff-99f56593b86d

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/369a33cc-9055-4d25-bcff-99f56593b86d) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Set up your Gemini API key (see instructions above)

# Step 5: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Google Gemini API

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/369a33cc-9055-4d25-bcff-99f56593b86d) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes it is!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
