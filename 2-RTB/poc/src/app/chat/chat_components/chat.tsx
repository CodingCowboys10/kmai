import React, { useEffect, useRef } from 'react';
import {Properties} from "csstype";

interface Message {
  request: string;
  answer: string;
}

interface ChatProps {
  list: Message[];
}
function Chat({list}:ChatProps) {
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
    
    const messageContainerStyle: Properties = {
    	display: 'flex',
    	flexDirection: 'column',
   	    alignItems: 'flex-start',
        paddingTop: '80px'
	};


	const chatboxRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
         chatboxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [list]);
    
    
    const getMessageStyle = (message: string, isRequest: boolean): Properties => {
    const width = message.length;
    
    return {
      whiteSpace: 'pre-wrap',
      overflowWrap: 'break-word',
      textAlign: 'left', 
      padding: '0.5em',
      fontSize: '1.15em',
      marginBottom: '8px',
      ...(isRequest
        ? {
           marginLeft: width > 105 ? '2em' : 'auto',
           marginRight: '0',
        }
        : {
          marginRight: '2em',
        }),
      
      backgroundColor: isRequest ? '#87CEFA' : '#90EE90',
      color: '#000000',
    };
  };
    /*
  const calculateMessageWidth = (message: string): number => {
    const dummyElement = document.createElement('div');
    dummyElement.style.visibility = 'hidden';
    dummyElement.style.whiteSpace = 'pre-wrap';
    dummyElement.style.fontSize = '1.15em';
    dummyElement.innerText = message;

    document.body.appendChild(dummyElement);
    const width = dummyElement.offsetWidth/16;
    document.body.removeChild(dummyElement);

    return width;
  };
*/
	
    return (
        <>

            <div id="chatArea" className=" relative max-w-full h-min w-min" style={chatStyle}>
                {list.length === 0 && (
                    <div className="centered-text">
                        <p>Chat to consult documentation</p>
                    </div>
                )}
                <ul className="list-none" style={messageContainerStyle}>
                    {list.map((value, index) => (
                        <React.Fragment key={index}>
                            <li className="request" style={getMessageStyle(value.request, true)}>
                                {value.request}
                            </li>
                            <li className="answer" style={getMessageStyle(value.request, false)}>
                                {value.answer}
                            </li>
                        </React.Fragment>
                    ))}
                </ul>
                {}
                <div ref={chatboxRef}></div>
            </div>
        </>
    );
}

export default Chat;
