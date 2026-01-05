'use client';

import { useEffect, useMemo, useState } from 'react';
import { Character, getCharacters } from '@/services/api';
import LoadingState from '@/components/LoadingState';
import DashboardHeader from '@/components/DashboardHeader';
import FiltersPanel from '@/components/FiltersPanel';
import StatsCard from '@/components/StatsCard';
import { Card } from '@/components/Card';

interface Stats {
  total: number;
  alive: number;
  dead: number;
  unknown: number;
}

export default function DashboardPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
const [stats, setStats] = useState<Stats>({
  total: 0,
  alive: 0,
  dead: 0,
  unknown: 0
});

  useEffect(() => {
    fetchCharacters();
  }, []);

 const fetchCharacters = async () => {
  try {
    setLoading(true);
    const characters = await getCharacters();
    
    setCharacters(characters);
    setFilteredCharacters(characters);
    calculateStats(characters);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Error inesperado');
  } finally {
    setLoading(false);
  }
};

  const calculateStats = (list: Character[]) => {
    const alive = list.filter(c => c.status === 'Alive').length;
    const dead = list.filter(c => c.status === 'Dead').length;
    const unknown = list.filter(c => c.status === 'unknown').length;

    setStats({
      total: list.length,
      alive,
      dead,
      unknown,
    });
  };

  useEffect(() => {
    let temp = [...characters];

    if (search) {
      temp = temp.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      temp = temp.filter(c => c.status === statusFilter);
    }

    setFilteredCharacters(temp);
  }, [search, statusFilter, characters]);

  
  const totalCharacters = useMemo(() => {
    return filteredCharacters.length;
  }, [filteredCharacters]);

 if (loading) {
  return <LoadingState />;
}

  if (error) {
    return (
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
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '900',
            color: '#88e23b',
            margin: '0 0 0.5rem 0',
            textShadow: '3px 3px 6px rgba(0,0,0,0.4)',
            letterSpacing: '2px'
          }}>
            🛸 RICK AND MORTY 🛸
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#ebe480',
            margin: 0,
            fontWeight: '600',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            ⚡ Multiverso de Personajes · {stats.total} aventureros ⚡
          </p>
        </div>
      </header>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem 3rem' }}>
        {/* Estadísticas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #043c6e 0%, #60a85f 100%)',
            padding: '2rem',
            borderRadius: '20px',
            boxShadow: '0 10px 25px rgba(4, 60, 110, 0.3)',
            border: '3px solid #88e23b',
            transform: 'translateY(0)',
            transition: 'transform 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{
              fontSize: '1rem',
              color: '#ebe480',
              marginBottom: '0.75rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>📊 Total</div>
            <div style={{
              fontSize: '3rem',
              fontWeight: '900',
              color: '#fff',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>{stats.total}</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #60a85f 0%, #88e23b 100%)',
            padding: '2rem',
            borderRadius: '20px',
            boxShadow: '0 10px 25px rgba(96, 168, 95, 0.3)',
            border: '3px solid #6b7132',
            transform: 'translateY(0)',
            transition: 'transform 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{
              fontSize: '1rem',
              color: '#043c6e',
              marginBottom: '0.75rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>✅ Vivos</div>
            <div style={{
              fontSize: '3rem',
              fontWeight: '900',
              color: '#fff',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>{stats.alive}</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #043c6e 0%, #a6cccc 100%)',
            padding: '2rem',
            borderRadius: '20px',
            boxShadow: '0 10px 25px rgba(4, 60, 110, 0.3)',
            border: '3px solid #6b7132',
            transform: 'translateY(0)',
            transition: 'transform 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{
              fontSize: '1rem',
              color: '#ebe480',
              marginBottom: '0.75rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>💀 Muertos</div>
            <div style={{
              fontSize: '3rem',
              fontWeight: '900',
              color: '#fff',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>{stats.dead}</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #ebe480 0%, #88e23b 100%)',
            padding: '2rem',
            borderRadius: '20px',
            boxShadow: '0 10px 25px rgba(235, 228, 128, 0.3)',
            border: '3px solid #6b7132',
            transform: 'translateY(0)',
            transition: 'transform 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{
              fontSize: '1rem',
              color: '#043c6e',
              marginBottom: '0.75rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>❓ Desconocido</div>
            <div style={{
              fontSize: '3rem',
              fontWeight: '900',
              color: '#fff',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>{stats.unknown}</div>
          </div>
        </div>

        {/* Filtros */}
        <div style={{
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '20px',
          marginBottom: '2.5rem',
          boxShadow: '0 15px 40px rgba(4, 60, 110, 0.2)',
          border: '4px solid #88e23b'
        }}>
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <div style={{ flex: '1 1 300px' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '700',
                color: '#043c6e',
                marginBottom: '0.5rem',
                textTransform: 'uppercase'
              }}>🔍 Buscar</label>
              <input
                type="text"
                placeholder="Buscar personajes..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  border: '3px solid #a6cccc',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  fontWeight: '600'
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
            <div style={{ flex: '0 1 220px' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '700',
                color: '#043c6e',
                marginBottom: '0.5rem',
                textTransform: 'uppercase'
              }}>📋 Estado</label>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  border: '3px solid #a6cccc',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  outline: 'none',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#88e23b'}
                onBlur={(e) => e.target.style.borderColor = '#a6cccc'}
              >
                <option value="all">Todos</option>
                <option value="Alive">Vivos</option>
                <option value="Dead">Muertos</option>
                <option value="unknown">Desconocido</option>
              </select>
            </div>
            <div style={{
              padding: '1rem 1.5rem',
              background: 'linear-gradient(135deg, #60a85f 0%, #88e23b 100%)',
              borderRadius: '12px',
              fontSize: '1rem',
              color: '#fff',
              fontWeight: '900',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 12px rgba(96, 168, 95, 0.3)',
              border: '2px solid #6b7132'
            }}>
              ⚡ {totalCharacters} resultados
            </div>
          </div>
        </div>

        {/* Lista de Personajes */}
        {filteredCharacters.length === 0 ? (
          <div style={{
            backgroundColor: '#fff',
            padding: '4rem 2rem',
            borderRadius: '20px',
            boxShadow: '0 15px 40px rgba(4, 60, 110, 0.2)',
            border: '4px solid #ebe480',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '5rem',
              marginBottom: '1.5rem',
              filter: 'grayscale(0.3)'
            }}>🔍</div>
            <h3 style={{
              fontSize: '2rem',
              fontWeight: '900',
              color: '#043c6e',
              marginBottom: '1rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}>
              ¡Wubba Lubba Dub Dub!
            </h3>
            <p style={{
              fontSize: '1.1rem',
              color: '#60a85f',
              margin: 0,
              fontWeight: '600'
            }}>
              No se encontraron personajes en este universo
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {filteredCharacters.map((character, index) => (
              <div 
                key={character.id}
                style={{
                  animation: `slideIn 0.5s ease-out ${index * 0.05}s both`,
                  transform: 'translateY(0)',
                  transition: 'transform 0.3s ease'
                }}
              >
                <div style={{
                  backgroundColor: '#fff',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(4, 60, 110, 0.2)',
                  border: '4px solid',
                  borderColor: character.status === 'Alive' ? '#88e23b' : 
                               character.status === 'Dead' ? '#043c6e' : '#ebe480',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(4, 60, 110, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(4, 60, 110, 0.2)';
                }}>
                  <div style={{ 
                    position: 'relative',
                    paddingBottom: '100%',
                    overflow: 'hidden',
                    background: `linear-gradient(135deg, ${
                      character.status === 'Alive' ? '#60a85f' : 
                      character.status === 'Dead' ? '#a6cccc' : '#ebe480'
                    } 0%, #fff 100%)`
                  }}>
                    <img 
                      src={character.image}
                      alt={character.name}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <div style={{ 
                    padding: '1.5rem',
                    background: character.status === 'Alive' 
                      ? 'linear-gradient(135deg, #60a85f 0%, #88e23b 100%)'
                      : character.status === 'Dead'
                      ? 'linear-gradient(135deg, #043c6e 0%, #a6cccc 100%)'
                      : 'linear-gradient(135deg, #ebe480 0%, #88e23b 100%)'
                  }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '900',
                      color: '#fff',
                      margin: '0 0 0.75rem 0',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                      letterSpacing: '0.5px'
                    }}>
                      {character.name}
                    </h3>
                    <div style={{
                      display: 'flex',
                      gap: '0.5rem',
                      flexWrap: 'wrap',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        padding: '0.4rem 1rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '20px',
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        color: character.status === 'Alive' ? '#60a85f' : 
                               character.status === 'Dead' ? '#043c6e' : '#6b7132',
                        border: '2px solid rgba(255, 255, 255, 0.5)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}>
                        {character.status === 'Alive' ? '✅' : 
                         character.status === 'Dead' ? '💀' : '❓'} {character.status}
                      </span>
                      <span style={{
                        padding: '0.4rem 1rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '20px',
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        color: '#6b7132',
                        border: '2px solid rgba(255, 255, 255, 0.5)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}>
                        🧬 {character.species}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
  );
}
