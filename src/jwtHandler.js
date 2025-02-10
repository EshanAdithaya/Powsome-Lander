import React, { useEffect, useState } from 'react';

const JWTHandlerPage = () => {
  const [status, setStatus] = useState({
    loading: true,
    message: 'Initializing...',
    error: null
  });
  const API_REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
  const JWTHandler = {
    allowedDomains: ['multivendor-seller-remake.vercel.app', 'localhost:3000', 'localhost:3001'],

    validateDomain() {
      const currentDomain = window.location.hostname + 
        (window.location.port ? ':' + window.location.port : '');
      console.log('Validating domain:', currentDomain);
      return this.allowedDomains.includes(currentDomain);
    },

    validateJWTFormat(jwt) {
      console.log('Validating JWT format:', jwt);
      const parts = jwt.split('.');
      if (parts.length !== 3) return false;

      try {
        const payload = JSON.parse(atob(parts[1]));
        if (!payload.exp) return false;

        const currentTime = Math.floor(Date.now() / 1000);
        return payload.exp > currentTime;
      } catch (error) {
        console.error('JWT validation error:', error);
        return false;
      }
    },

    checkExistingJWT() {
      try {
        const jwt = localStorage.getItem('token');
        console.log('Checking existing JWT:', jwt);
        if (!jwt) return false;
        return this.validateJWTFormat(jwt);
      } catch (error) {
        console.error('Error checking existing JWT:', error);
        return false;
      }
    },

    handleJWTStorage(jwtParam) {
      try {
        console.log('Storing JWT:', jwtParam);
        localStorage.setItem('token', jwtParam);
        const storedJWT = localStorage.getItem('token');
        return storedJWT === jwtParam;
      } catch (error) {
        console.error('JWT storage error:', error);
        return false;
      }
    },

    cleanupURL() {
      try {
        const url = new URL(window.location.href);
        url.searchParams.delete('jwt');
        window.history.replaceState({}, '', url.toString());
        console.log('Cleaned up URL:', url.toString());
      } catch (error) {
        console.error('URL cleanup error:', error);
      }
    },

    getUserRole(jwt) {
      try {
        const payload = JSON.parse(atob(jwt.split('.')[1]));
        console.log('User role from JWT:', payload.role);
        return payload.role;
      } catch (error) {
        console.error('Error getting user role:', error);
        return null;
      }
    },

    async checkShopStatus() {
      try {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found in storage');
        }
        console.log('Checking shop status with token:', token);

        const response = await fetch(`${API_REACT_APP_BASE_URL}/api/shops`, {
          method: 'GET',
          headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Shop status check failed with status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Shop status response:', data); // Debug log
        return Array.isArray(data) && data.length === 0;
      } catch (error) {
        console.error('Error checking shop status:', error);
        throw error;
      }
    },

    async initialize() {
      try {
        console.log('Initializing JWT handler...');
        // Check domain validity
        if (!this.validateDomain()) {
          return { 
            success: false, 
            error: 'Invalid domain',
            message: 'Authorization failed: Invalid domain' 
          };
        }

        // Get JWT from URL
        const url = new URL(window.location.href);
        const jwtParam = url.searchParams.get('jwt');
        console.log('JWT from URL:', jwtParam);

        if (!jwtParam) {
          return { 
            success: false, 
            error: 'No token found',
            message: 'Authorization failed: No token found in URL' 
          };
        }

        // Validate JWT format
        if (!this.validateJWTFormat(jwtParam)) {
          return { 
            success: false, 
            error: 'Invalid token format',
            message: 'Authorization failed: Invalid token format' 
          };
        }

        // Store JWT first
        if (!this.handleJWTStorage(jwtParam)) {
          return { 
            success: false, 
            error: 'Token storage failed',
            message: 'Authorization failed: Unable to store token' 
          };
        }

        // Get user role
        const role = this.getUserRole(jwtParam);
        console.log('User role:', role);
        
        // Check shop status for shop_admin
        if (role === 'shop_admin') {
          try {
            setStatus(prev => ({ ...prev, message: 'Checking shop status...' }));
            const needsShopCreation = await this.checkShopStatus();
            
            // Clean up URL
            // this.cleanupURL();
            
            if (needsShopCreation) {
              return { 
                success: true, 
                message: 'Redirecting to shop creation...',
                redirectTo: '/createShop'
              };
            }
          } catch (error) {
            console.error('Shop status check failed:', error);
            return {
              success: false,
              error: 'Shop verification failed',
              message: 'Failed to verify shop status. Please try again.'
            };
          }
        }

        // Clean up URL if not already done
        // this.cleanupURL();

        return { 
          success: true, 
          message: 'Authorization successful. Redirecting...',
          redirectTo: '/'
        };
      } catch (error) {
        return { 
          success: false, 
          error: error.message,
          message: `Authorization failed: ${error.message}` 
        };
      }
    }
  };

  useEffect(() => {
    const handleInitialization = async () => {
      try {
        console.log('Starting initialization...');
        setStatus(prev => ({ ...prev, message: 'Validating token...' }));
        const result = await JWTHandler.initialize();
        console.log('Initialization result:', result);

        if (result.success) {
          setStatus(prev => ({ 
            ...prev, 
            message: result.message 
          }));
          
          // Short delay to show success message
          setTimeout(() => {
            window.location.href = result.redirectTo || '/';
          }, 1500);
        } else {
          setStatus({
            loading: false,
            message: result.message,
            error: result.error
          });
        }
      } catch (error) {
        console.error('Initialization error:', error);
        setStatus({
          loading: false,
          message: 'Authorization failed',
          error: error.message
        });
      }
    };

    handleInitialization();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <div className="space-y-4">
          {status.loading && (
            <div className="flex justify-center mb-4">
              <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          <h2 className="text-xl font-semibold">
            {status.error ? 'Authentication Error' : 'Authentication in Progress'}
          </h2>
          
          <p className={`text-sm ${status.error ? 'text-red-600' : 'text-gray-600'}`}>
            {status.message}
          </p>

          {status.error && (
            <button
              onClick={() => window.location.href = '/login'}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
            >
              Return to Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JWTHandlerPage;