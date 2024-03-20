import { Document } from "@langchain/core/documents";
import { Message as VercelChatMessage } from "ai";
import { PromptTemplate } from "@langchain/core/prompts";

const combineDocumentsFn = (docs: Document[]) => {
  const serializedDocs = docs.map((doc) => doc.pageContent);
  return serializedDocs.join("\n\n");
};

const formatVercelMessages = (chatHistory: VercelChatMessage[]) => {
  const formattedDialogueTurns = chatHistory.map((message) => {
    if (message.role === "user") {
      return `Human: ${message.content}`;
    } else if (message.role === "assistant") {
      return `Assistant: ${message.content}`;
    } else {
      return `${message.role}: ${message.content}`;
    }
  });
  return formattedDialogueTurns.join("\n");
};

const CONDENSE_QUESTION_TEMPLATE = `Data la seguente conversazione e una domanda di follow-up, riformula la domanda di follow-up in una domanda autonoma, nella sua lingua originale.

<chat_history>
  {chat_history}
</chat_history>

Domanda di follow-up: {question}
Domanda autonoma: `;

const condenseQuestionPrompt = PromptTemplate.fromTemplate(
  CONDENSE_QUESTION_TEMPLATE,
);

const ANSWER_TEMPLATE = `
Sei un cordiale assistente AI che deve chattare a supporto di un documento, hai il compito di rispondere alle mie domande unicamente inerenti al contesto del documento. 
Se la domanda NON E' pertinente al contesto del documento o a qualisasi altra cosa NON DEVI RISPONDERE.
Se non conosci la risposta NON rispondere.
Rispondi alla domanda in base solamente al context che segue e alla chat history:
<context>
  {context}
</context>

<chat_history>
  {chat_history}
</chat_history>

Question: {question}
`;

const answerPrompt = PromptTemplate.fromTemplate(ANSWER_TEMPLATE);

export {
  combineDocumentsFn,
  formatVercelMessages,
  answerPrompt,
  ANSWER_TEMPLATE,
  condenseQuestionPrompt,
};
