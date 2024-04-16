// npx jest src/tests/components/ChatList.test.tsx --coverage
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChatList from "@/components/chat/chatList";

describe('ChatList', () => {
  it('Verifica che il componente ChatList sia renderizzato correttamente', () => {

    render(<ChatList />);
    expect(screen.getByText('Nuova Chat')).toBeInTheDocument();
    expect(screen.getByTestId('ButtonNewChat')).toBeInTheDocument();
    expect(screen.getByTestId('ScrollAreaChat')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('ButtonNewChat'));
  });
});