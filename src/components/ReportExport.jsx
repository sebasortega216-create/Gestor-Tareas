import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Convierte segundos a un texto legible "Hh Mm"
const formatDuration = (totalSeconds) => {
  const seconds = Math.max(0, Math.floor(totalSeconds || 0));
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
};

const buildReportData = (tasks) =>
  tasks.map((task) => ({
    "ID de Tarea": task.id,
    "Nombre": task.title,
    "Descripción": task.description || "",
    "Estado": task.status === "completed" ? "Completada" : "Pendiente",
    "Tiempo estimado (min)": task.estimatedTime || 0,
    "Tiempo invertido": formatDuration(task.timeSpent),
    "Fecha de Creación": task.createdAt?.toDate
      ? task.createdAt.toDate().toLocaleDateString()
      : ""
  }));

export const ReportExport = ({ tasks }) => {
  const reportData = buildReportData(tasks);

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(reportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tareas");
    XLSX.writeFile(workbook, "mis-tareas-reporte.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Reporte de Productividad - Mis Tareas", 14, 15);

    const headers = [Object.keys(reportData[0] || {})];
    const rows = reportData.map((row) => Object.values(row));

    autoTable(doc, {
      head: headers,
      body: rows,
      startY: 22,
      styles: { fontSize: 8 }
    });

    doc.save("mis-tareas-reporte.pdf");
  };

  return (
    <div className="glass-container" style={{ marginTop: '1rem' }}>
      <h3 style={{ marginBottom: '1rem' }}>Reporte de Productividad</h3>
      {tasks.length > 0 ? (
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
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
            Exportar CSV
          </CSVLink>

          <button
            className="btn"
            style={{
              background: 'rgba(255,255,255,0.3)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.5)'
            }}
            onClick={handleExportExcel}
          >
            Exportar Excel
          </button>

          <button
            className="btn"
            style={{
              background: 'rgba(255,255,255,0.3)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.5)'
            }}
            onClick={handleExportPDF}
          >
            Exportar PDF
          </button>
        </div>
      ) : (
        <p style={{ color: 'rgba(255,255,255,0.7)' }}>No hay tareas para exportar.</p>
      )}
    </div>
  );
};