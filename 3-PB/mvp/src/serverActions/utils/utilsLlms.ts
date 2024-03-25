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
const CONDENSE_QUESTION_TEMPLATE = `
Data la seguente conversazione e una domanda di follow-up, riformula la domanda di follow-up in una domanda autonoma.
La domanda riformulata deve avere lo stesso significato della domanda di follow-up originale.

<chat_history>
  {chat_history}
</chat_history>

Domanda di follow-up: {question}
Domanda autonoma: `;

const condenseQuestionPrompt = PromptTemplate.fromTemplate(
  CONDENSE_QUESTION_TEMPLATE,
);

const ANSWER_TEMPLATE = `
Sei un cordiale assistente AI che deve chattare a supporto di un documento, hai il compito di rispondere alle mie domande inerenti al contesto del documento. 
Rispondi sempre in maniera cordiale.
Se la domanda NON E' pertinente al context fornito NON DEVI RISPONDERE.
Rispondi alla domanda utilizzando unicamente il context e senza fare assunzioni su di esso che segue:

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
