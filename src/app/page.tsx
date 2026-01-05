'use client'
import { Character, getCharacters } from "@/services/api"
import { Card} from "@/components/Card"
import { useEffect, useState } from "react"
import LoadingState from '@/components/LoadingState';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    getCharacters()
      .then(setCharacters)
      .catch((error) => {
        setError(error.message || 'Unknown error occurred')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) return <LoadingState />; 

  if (error) return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #043c6e 0%, #60a85f 100%)'
    }}>
      <div style={{
        padding: '2.5rem',
        backgroundColor: '#fff',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        maxWidth: '500px',
        border: '4px solid #88e23b'
      }}>
        <strong style={{ color: '#043c6e', fontSize: '1.2rem' }}>Error:</strong> {error}
      </div>
    </div>
  )

  if (characters.length === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #a6cccc 0%, #ebe480 50%, #88e23b 100%)'
      }}>
        <div style={{
          backgroundColor: '#fff',
          padding: '4rem 2rem',
          borderRadius: '20px',
          boxShadow: '0 15px 40px rgba(4, 60, 110, 0.2)',
          border: '4px solid #ebe480',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🚀</div>
          <h3 style={{
            fontSize: '2rem',
            fontWeight: '900',
            color: '#043c6e',
            marginBottom: '1rem'
          }}>No se encontraron personajes</h3>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #a6cccc 0%, #ebe480 50%, #88e23b 100%)',
      fontFamily: '"Comic Sans MS", "Trebuchet MS", Arial, sans-serif',
      padding: '2rem 0'
    }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(90deg, #043c6e 0%, #60a85f 100%)',
        padding: '2rem 0',
        marginBottom: '2.5rem',
        boxShadow: '0 10px 30px rgba(4, 60, 110, 0.3)',
        borderBottom: '5px solid #88e23b'
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: '0 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: '900',
              color: '#88e23b',
              margin: '0 0 0.5rem 0',
              textShadow: '3px 3px 6px rgba(0,0,0,0.4)',
              letterSpacing: '2px'
            }}>🌌 RICK AND MORTY EXPLORER 🌌</h1>
            <p style={{
              fontSize: '1.1rem',
              color: '#ebe480',
              margin: 0,
              fontWeight: '600',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>⚡ Descubre a {characters.length} personajes interdimensionales ⚡</p>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => router.push('/login')}
              style={{
                padding: '0.8rem 2rem',
                fontSize: '1rem',
                fontWeight: '700',
                color: '#043c6e',
                background: 'linear-gradient(135deg, #88e23b 0%, #60a85f 100%)',
                border: '3px solid #ebe480',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                boxShadow: '0 5px 15px rgba(136, 226, 59, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(136, 226, 59, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(136, 226, 59, 0.4)';
              }}
            >
              🚀 Iniciar Sesión
            </button>
            
            <button
              onClick={() => router.push('/register')}
              style={{
                padding: '0.8rem 2rem',
                fontSize: '1rem',
                fontWeight: '700',
                color: '#fff',
                background: 'linear-gradient(135deg, #6b7132 0%, #60a85f 100%)',
                border: '3px solid #a6cccc',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                boxShadow: '0 5px 15px rgba(107, 113, 50, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(107, 113, 50, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(107, 113, 50, 0.4)';
              }}
            >
              ✨ Registrarse
            </button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem 3rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {characters.map((char, index) => (
            <div 
              key={char.id}
              style={{
                animation: `slideIn 0.5s ease-out ${index * 0.05}s both`
              }}
            >
              <Card
                title={char.name}
                description={`${char.status} · ${char.species}`}
                imageUrl={char.image}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
