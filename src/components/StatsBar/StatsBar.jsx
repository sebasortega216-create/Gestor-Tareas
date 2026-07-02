// Muestra las 4 estadísticas: total, completadas, pendientes y % de productividad
const StatBlock = ({ label, value }) => (
  <div>
    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>{label}</div>
    <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: 'white' }}>{value}</div>
  </div>
);

export const StatsBar = ({ tasks }) => {
  const total = tasks.length;
  const completadas = tasks.filter((t) => t.status === 'completed').length;
  const pendientes = total - completadas;
  const productividad = total > 0 ? Math.round((completadas / total) * 100) : 0;

  return (
    <div
      className="glass-container"
      style={{
        marginBottom: '1.5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '1rem',
        textAlign: 'center'
      }}
    >
      <StatBlock label="Total" value={total} />
      <StatBlock label="Completadas" value={completadas} />
      <StatBlock label="Pendientes" value={pendientes} />
      <StatBlock label="Productividad" value={`${productividad}%`} />
    </div>
  );
};