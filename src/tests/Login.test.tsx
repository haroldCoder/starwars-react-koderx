import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../components/Login';
import '@testing-library/jest-dom';

describe('Component Login', () => {
  test('rederiza formulario del login', () => {
    // Renderiza el componente
    render(<Login setIsLogin={() => {}} />);

    // Verifica que los campos de usuario y contraseña estén presentes
    const userInputElement = screen.getByPlaceholderText('Write you user');
    const passwordInputElement = screen.getByPlaceholderText('Write password');

    expect(userInputElement).toBeInTheDocument();
    expect(passwordInputElement).toBeInTheDocument();
  });

  test('suenvia formulario con usuario y contraseña', () => {
    
    const mockSetIsLogin = jest.fn(); // Mock de la función setIsLogin

    // Renderiza el componente
    render(<Login setIsLogin={mockSetIsLogin} />);

    // Obtén los elementos de entrada
    const userInputElement = screen.getByPlaceholderText('Write you user');
    const passwordInputElement = screen.getByPlaceholderText('Write password');
    const submitButtonElement = screen.getByText('Login');

    // Simula la entrada de usuario y contraseña
    fireEvent.change(userInputElement, { target: { value: 'testUser' } });
    fireEvent.change(passwordInputElement, { target: { value: 'testPassword' } });

    // el test le da click al boton para enviar los datos
    fireEvent.click(submitButtonElement);

    // Verifica que setIsLogin haya sido llamada con el valor esperado
    expect(mockSetIsLogin).toHaveBeenCalledWith(true);

    
    expect(localStorage.getItem('name')).toBe('testUser');
    expect(localStorage.getItem('password')).toBe('testPassword'); // Verifica que los datos de usuario y contraseña se hayan guardado en localStorage
  });
});