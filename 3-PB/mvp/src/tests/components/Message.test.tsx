// npx jest src/tests/components/Message.test.tsx --coverage
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Message from "@/components/chat/message";

describe('Message', () => {
  it('Verifica che il componente Message sia renderizzato correttamente', () => {

    const message = {
        messageText: 'This is a generated message',
        time: new Date(),
        isGenerated: true,
        documentLink: 'https://example.com/document.pdf',
        pageNumber: '1',
    };
  
    const { getByText, getByTestId } = render(<Message {...message} />);

    expect(getByText('This is a generated message')).toBeInTheDocument();

  });
});