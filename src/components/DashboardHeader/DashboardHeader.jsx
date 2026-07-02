// Barra superior del Dashboard: título, correo del usuario y botón de cerrar sesión
export const DashboardHeader = ({ userEmail, onLogout }) => {
  return (
    <div
      className="glass-container"
      style={{
        marginBottom: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}
    >
      <h1>Mis Tareas</h1>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <span style={{ color: 'rgba(255,255,255,0.8)' }}>{userEmail}</span>
        <button className="btn btn-danger" onClick={onLogout}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};