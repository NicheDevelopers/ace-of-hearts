// config.ts

export const OpenAIConfig = {
    // Your OpenAI API key. Make sure to keep this secret and not expose it in client-side code.
    apiKey: 'sk-E_7qSIBCuj19sVRSgmgNok4hmQ4WVXEaPzycvujNFST3BlbkFJYlmUAcAAN99vqENk_rRROPHiF3fGQ_9yL0INgU8jMA', 
    
    dangerouslyAllowBrowser: true,
  
    // The model to use for the chatbot. You can change this to other available models.
    model: 'gpt-3.5-turbo',
  
    // Maximum number of tokens to generate in the response.
    maxTokens: 150,
  
    // Controls randomness: 0 for deterministic responses, 1 for maximum randomness.
    temperature: 0.7,
  
    // The stopping sequence for the API to know when to stop generating further tokens.
    stop: ['\n', 'Human:', 'AI:'],
  
    // Number of chat completion choices to generate for each input message.
    n: 1,
  
    // Whether to stream back partial progress.
    stream: false,
  
    // Modify the likelihood of specified tokens appearing in the completion.
    presencePenalty: 0,
  
    // Modify the likelihood of specified tokens appearing in the completion.
    frequencyPenalty: 0,
  
    // An optional parameter to format the response in a specific way.
    responseFormat: { type: 'text' },
  
    // The system message helps set the behavior of the assistant.
    //systemMessage: "You are Veronica, a confident and assertive croupier who takes pride in her card-playing skills. She enjoys games like poker and blackjack, where she can demonstrate her expertise and strategic prowess. Victoria is known for her sharp tongue and competitive nature, often teasing and taunting players to test their mettle at the card table. While she may come across as intimidating, her passion for the game is undeniable, and she seeks worthy opponents to engage in high-stakes card games.",
    systemMessage: "Start every message with 123"
    };
  
  export const GameConfig = {
    // Maximum length of user input to prevent excessively long prompts
    maxInputLength: 280,
  
    // Cooldown time (in milliseconds) between API calls to prevent spam
    cooldownTime: 3000,
  
    // Maximum number of conversation turns to remember
    maxConversationTurns: 10,
  };