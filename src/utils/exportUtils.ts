
interface Message {
  sender: 'ai' | 'user';
  text: string;
}

export const exportConversation = (messages: Message[]): boolean => {
  try {
    // Format the conversation
    const formattedConversation = messages.map(message => {
      const prefix = message.sender === 'ai' ? 'ReflectBot: ' : 'You: ';
      return `${prefix}${message.text}`;
    }).join('\n\n');

    // Add timestamp and header
    const dateTime = new Date().toLocaleString();
    const header = `ReflectBot Reflection Session\n${dateTime}\n\n`;
    const content = header + formattedConversation;

    // Create file name with date
    const fileName = `reflection-${new Date().toISOString().split('T')[0]}.txt`;

    // Create a blob
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
    
    return true;
  } catch (error) {
    console.error('Error exporting conversation:', error);
    return false;
  }
};
