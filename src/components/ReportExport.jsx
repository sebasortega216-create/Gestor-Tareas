import { CSVLink } from "react-csv";

export const ReportExport = ({ tasks }) => {

  const reportData = tasks.map(task => ({
    "ID de Tarea": task.id,
    "Nombre": task.title,
    "Estado": task.status === 'pending' ? 'Pendiente' : 'Completada',
    "Tiempo Invertido (Min)": task.timeSpent,
    "Fecha de Creación": task.createdAt?.toDate().toLocaleDateString()
  }));

  return (
    <div className="glass-container" style={{ marginTop: '1rem' }}>
      <h3 style={{ marginBottom: '1rem' }}>Reporte de Productividad</h3>
      {tasks.length > 0 ? (
        <CSVLink
          data={reportData}
          filename={"mis-tareas-reporte.csv"}
          style={{
            padding: '0.6rem 1.2rem',
            background: 'rgba(255,255,255,0.3)',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.5)'
          }}
        >
          Descargar Reporte en Excel
        </CSVLink>
      ) : (
        <p style={{ color: 'rgba(255,255,255,0.7)' }}>No hay tareas para exportar.</p>
      )}
    </div>
  );
};