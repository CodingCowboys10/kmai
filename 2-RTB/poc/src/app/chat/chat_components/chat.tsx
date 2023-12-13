import {Properties} from "csstype";


function Chat() {
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
                Chat Body Component
            </div>
        </>
    );
}

export default Chat;
