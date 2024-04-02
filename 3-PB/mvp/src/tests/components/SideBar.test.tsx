// npx jest src/tests/components/SideBar.test.tsx --coverage
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SideBar from '@/components/sideBar';

describe("SideBar", () => {
  it("Verifica che il componente SideBar sia renderizzato correttamente", () => {
    render(
      <SideBar>
        <div>Child Component</div>
      </SideBar>
    );

    const childElement = screen.getByText("Child Component");
    expect(childElement).toBeInTheDocument();
  });

  it("Verifica che il componente SideBar si comporti correttamente", () => {
    render(
      <SideBar>
        <div>Child Component</div>
      </SideBar>
    );

    const button = screen.getByTestId("ButtonCollapse");
    fireEvent.click(button);
    expect(screen.queryByTestId("isCollapsed")).toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.queryByTestId("isNotCollapsed")).toBeInTheDocument();
  });
});