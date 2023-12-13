import {ConversationalRetrievalQAChain} from "langchain/chains";
import {Chroma} from "langchain/vectorstores/chroma";
import {PromptTemplate} from "@langchain/core/prompts";
import {setPrompt, embeddings , collections , models} from "@/utils/chat_utils";

const chat_history : any[] = [];

export async function chainQA(model_name : string){
    return ConversationalRetrievalQAChain.fromLLM(
        models[model_name],
        (await Chroma.fromExistingCollection(embeddings[model_name], {collectionName: collections[model_name]})).asRetriever(),
        {
            qaChainOptions: {
                type: "stuff",
                prompt: PromptTemplate.fromTemplate(setPrompt()),
            },
            returnSourceDocuments: true,
        }
    )
}