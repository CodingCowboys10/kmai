// npx jest src/tests/components/ChatForm.test.tsx --coverage
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChatForm from "@/components/chat/chatForm";

describe('ChatForm', () => {
  it('Verifica che il componente ChatForm sia renderizzato correttamente', () => {

    render(<ChatForm />);
    expect(screen.getByText('Le risposte fornite possono contenere dati errati, verificare sempre le risposte.')).toBeInTheDocument();
    expect(screen.getByTestId('FormForm')).toBeInTheDocument();
    expect(screen.getByTestId('TextAreaForm')).toBeInTheDocument();
    expect(screen.getByTestId('ButtonForm')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('ButtonForm'));
  });
});