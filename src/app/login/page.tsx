'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateUser } from '@/utils/helpers';

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validación de campos vacíos
    if (!form.email || !form.password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    // Validar credenciales
    if (validateUser(form)) {
      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } else {
      setError('Credenciales incorrectas. Intenta con rick@sanchez.com / wubba123');
    }
  };

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #043c6e 0%, #60a85f 50%, #88e23b 100%)',
      fontFamily: '"Comic Sans MS", "Trebuchet MS", Arial, sans-serif',
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '30px',
        padding: '3rem',
        width: '100%',
        maxWidth: '450px',
        boxShadow: '0 25px 60px rgba(4, 60, 110, 0.4)',
        border: '5px solid #88e23b'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚀</div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #043c6e 0%, #60a85f 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>Portal Login</h1>
          <p style={{
            fontSize: '1rem',
            color: '#6b7132',
            fontWeight: '600'
          }}>Accede al multiverso</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {error && (
            <div style={{
              padding: '1rem',
              backgroundColor: '#fee',
              border: '3px solid #dc2626',
              borderRadius: '12px',
              color: '#dc2626',
              fontWeight: '600',
              textAlign: 'center'
            }}>
              ⚠️ {error}
            </div>
          )}

          {success && (
            <div style={{
              padding: '1rem',
              backgroundColor: '#e8f5e9',
              border: '3px solid #60a85f',
              borderRadius: '12px',
              color: '#60a85f',
              fontWeight: '600',
              textAlign: 'center'
            }}>
              ✅ ¡Acceso concedido! Redirigiendo al portal...
            </div>
          )}

          {success && (
            <div style={{
              padding: '1rem',
              backgroundColor: '#e8f5e9',
              border: '3px solid #60a85f',
              borderRadius: '12px',
              color: '#60a85f',
              fontWeight: '600',
              textAlign: 'center'
            }}>
              ✅ ¡Acceso concedido! Redirigiendo al portal...
            </div>
          )}

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '700',
              color: '#043c6e',
              marginBottom: '0.5rem',
              textTransform: 'uppercase'
            }}>📧 Email</label>
            <input
              type="email"
              name="email"
              placeholder="tu@email.com"
              value={form.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                border: '3px solid #a6cccc',
                borderRadius: '12px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease',
                fontWeight: '600',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#88e23b';
                e.target.style.boxShadow = '0 0 0 3px rgba(136, 226, 59, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#a6cccc';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '700',
              color: '#043c6e',
              marginBottom: '0.5rem',
              textTransform: 'uppercase'
            }}>🔐 Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                border: '3px solid #a6cccc',
                borderRadius: '12px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease',
                fontWeight: '600',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#88e23b';
                e.target.style.boxShadow = '0 0 0 3px rgba(136, 226, 59, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#a6cccc';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '1.25rem',
              background: 'linear-gradient(135deg, #60a85f 0%, #88e23b 100%)',
              color: '#fff',
              border: '3px solid #6b7132',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: '900',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              boxShadow: '0 8px 20px rgba(96, 168, 95, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(96, 168, 95, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(96, 168, 95, 0.3)';
            }}
          >
            🚀 Ingresar al Portal
          </button>
        </form>
      </div>
    </main>
  );
}
