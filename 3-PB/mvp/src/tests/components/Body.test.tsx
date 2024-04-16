// npm i @testing-library/user-event  @types/jest @testing-library/react @testing-library/jest-dom npm install jest ts-jest jest-config jest-environment-jsdom
// npx jest src/tests/components/Body.test.tsx --coverage
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Body from '@/components/body';

describe("Body", () => {
  it("Verifica che il componente Body sia renderizzato correttamente", () => {
    render(
      <Body>
        <div>Child Component</div>
      </Body>
    );

    const childElement = screen.getByText("Child Component");
    expect(childElement).toBeInTheDocument();
  });
});
