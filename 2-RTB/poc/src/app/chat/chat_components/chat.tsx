"use client"
import {Properties} from "csstype";
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { FormEvent, useCallback, useState } from 'react';
'use client';

import { useChat } from 'ai/react';
export const runtime = 'edge';

function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat();

    const chatStyle :Properties = {
        fontFamily: 'Roboto, sans-serif',
        minWidth: '60em',
        minHeight: '38em',
        maxWidth: '60em',
        maxHeight: '38em',
        overflowY: 'scroll',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        borderRadius: "10px",
        border : "solid",
    };

    return (
        <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
            {messages.map(m => (
                <div key={m.id}>
                    {m.role === 'user' ? 'User: ' : 'AI: '}
                    {m.content}
                </div>
            ))}

            <form onSubmit={handleSubmit}>
                <label>
                    Say something...
                    <input
                        className="fixed w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2"
                        value={input}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Send</button>
            </form>
        </div>

    );
}

export default Chat;
