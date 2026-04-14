import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL ?? 'https://library-ms-springboot-react-jwt-bs-ts.onrender.com'}/api/auth`;

export interface AuthResponse {
  token: string;
  email: string;
  name: string;
  isAdmin: boolean;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

class AuthService {
  async register(registerData: RegisterRequest): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(`${API_BASE_URL}/register`, registerData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({
        email: response.data.email,
        name: response.data.name,
        isAdmin: response.data.isAdmin,
        role: response.data.role
      }));
    }
    return response.data;
  }

  async login(loginData: LoginRequest): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(`${API_BASE_URL}/login`, loginData);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({
        email: response.data.email,
        name: response.data.name,
        isAdmin: response.data.isAdmin,
        role: response.data.role
      }));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  async validateToken(): Promise<boolean> {
    const token = this.getToken();
    if (!token) return false;

    try {
      const response = await axios.get(`${API_BASE_URL}/validate`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.status === 200;
    } catch (error) {
      this.logout();
      return false;
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserEmail(): string | null {
    const user = this.getCurrentUser();
    return user ? user.email : null;
  }
}

export default new AuthService();
