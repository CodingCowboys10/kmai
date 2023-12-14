"use client"
import {Properties} from "csstype";
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { FormEvent, useCallback, useState } from 'react';

export const runtime = 'edge';

function Chat() {
    const [stream, setStream] = useState(true);

    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [inflight, setInflight] = useState(false);
    const onSubmit = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();

            // Prevent multiple requests at once
            if (inflight) return;

            // Reset output
            setInflight(true);
            setOutput('');

            try {
                if (stream) {
                    console.log('streaming');
                    // If streaming, we need to use fetchEventSource directly
                    await fetchEventSource(`/api/chat`, {
                        method: 'POST',
                        body: JSON.stringify({ input }),
                        headers: { 'Content-Type': 'application/json' },
                        onmessage(ev) {
                            setOutput((o) => o + ev.data);
                        },
                    });
                    setInput('');
                } else {
                    // If not streaming, we can use the supabase client
                    const res = await fetch(`/api/chat`, {
                        method: 'POST',
                        body: JSON.stringify({ input }),
                    });
                    const data = await res.json();
                    setOutput(data.text);
                    setInput('');
                }
            } catch (error) {
                console.error(error);
            } finally {
                setInflight(false);
            }
        },
        [input, stream, inflight]
    );

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
        padding : "10px"
    };



    return (
        <>

            <div id="chatArea" className=" relative max-w-full h-min w-min" style={chatStyle}>
                {output}
                <button onClick={onSubmit}></button>
            </div>
        </>
    );
}

export default Chat;
