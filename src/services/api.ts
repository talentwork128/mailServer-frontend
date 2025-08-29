const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
console.log('!!!!!!!!!API Base URL:', API_BASE_URL);

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Set auth token in localStorage
const setAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

// Remove auth token from localStorage
const removeAuthToken = (): void => {
  localStorage.removeItem('authToken');
};

// Create headers with auth token
const createHeaders = (includeAuth: boolean = true): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

// Generic API request function
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log('!!!!!!!!!API Base URL:', API_BASE_URL);
  const response = await fetch(url, {
    ...options,
    headers: {
      ...createHeaders(),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || 'An error occurred');
  }

  return data;
};

// Auth API
export const authAPI = {
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    company?: string;
  }) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      headers: createHeaders(false),
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await apiRequest<{
      success: boolean;
      data: { user: any; token: string };
    }>('/auth/login', {
      method: 'POST',
      headers: createHeaders(false),
      body: JSON.stringify(credentials),
    });

    if (response.success && response.data.token) {
      setAuthToken(response.data.token);
    }

    return response;
  },

  logout: async () => {
    try {
      await apiRequest('/auth/logout', {
        method: 'POST',
      });
    } finally {
      removeAuthToken();
    }
  },

  verifyEmail: async (token: string, email: string) => {
    const response = await apiRequest<{
      success: boolean;
      data: { user: any; token: string };
    }>('/auth/verify-email', {
      method: 'POST',
      headers: createHeaders(false),
      body: JSON.stringify({ token, email }),
    });

    if (response.success && response.data.token) {
      setAuthToken(response.data.token);
    }

    return response;
  },

  resendVerification: async (email: string) => {
    return apiRequest('/auth/resend-verification', {
      method: 'POST',
      headers: createHeaders(false),
      body: JSON.stringify({ email }),
    });
  },

  getProfile: async () => {
    return apiRequest('/auth/me');
  },

  forgotPassword: async (email: string) => {
    return apiRequest('/auth/forgot-password', {
      method: 'POST',
      headers: createHeaders(false),
      body: JSON.stringify({ email }),
    });
  },

  resetPassword: async (token: string, password: string) => {
    return apiRequest('/auth/reset-password', {
      method: 'POST',
      headers: createHeaders(false),
      body: JSON.stringify({ token, password }),
    });
  },
};

// Template API
export const templateAPI = {
  submit: async (templateData: {
    title: string;
    subject: string;
    content: string;
    companyName: string;
    companyLocation: string;
    companyWebsite: string;
    contactPhone: string;
    category?: string;
    tags?: string[];
  }) => {
    return apiRequest('/template/submit', {
      method: 'POST',
      body: JSON.stringify(templateData),
    });
  },

  list: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `/template/list${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiRequest(endpoint);
  },

  getById: async (id: string) => {
    return apiRequest(`/template/${id}`);
  },

  update: async (id: string, templateData: {
    title: string;
    subject: string;
    content: string;
    companyName: string;
    companyLocation: string;
    companyWebsite: string;
    contactPhone: string;
    category?: string;
    tags?: string[];
  }) => {
    return apiRequest(`/template/${id}`, {
      method: 'PUT',
      body: JSON.stringify(templateData),
    });
  },

  delete: async (id: string) => {
    return apiRequest(`/template/${id}`, {
      method: 'DELETE',
    });
  },

  duplicate: async (id: string) => {
    return apiRequest(`/template/${id}/duplicate`, {
      method: 'POST',
    });
  },
};

// Support API
export const supportAPI = {
  submitMessage: async (messageData: {
    name: string;
    email: string;
    company?: string;
    subject?: string;
    message: string;
    priority?: string;
    category?: string;
  }) => {
    return apiRequest('/support/message', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  },

  getMessages: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    priority?: string;
    category?: string;
    search?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `/support/messages${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiRequest(endpoint);
  },

  getMessage: async (id: string) => {
    return apiRequest(`/support/message/${id}`);
  },

  respondToMessage: async (id: string, message: string) => {
    return apiRequest(`/support/message/${id}/respond`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  },

  updateMessageStatus: async (id: string, status: string, assignedTo?: string) => {
    return apiRequest(`/support/message/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, assignedTo }),
    });
  },

  getStats: async () => {
    return apiRequest('/support/stats');
  },
};

export { getAuthToken, setAuthToken, removeAuthToken };