import { jsPDF } from "jspdf";

export function GeneratePDF(title, questions) {
  const doc = new jsPDF();

  // Establecer el ancho de la línea a 2
  doc.setLineWidth(0.8);

  // Dibujar el rectángulo con el borde
  doc.rect(10, 10, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 20);

  // Título del documento
  doc.setFont('Times New Roman', 'bold');
  doc.setFontSize(20);
  doc.text(title, doc.internal.pageSize.width / 2, 30, { align: "center", });
  doc.setLineWidth(0.4);
  doc.line(65, 32, 145, 32);

  // Agregar las preguntas
  doc.setFont('Times New Roman', 'normal');
  doc.setFontSize(14);
  let counter = 1;
  let y = 45; // starting position for questions
  questions.forEach((question) => {
    const padding = 6; // space between text and rectangle

    doc.text(`${counter}.${question}`, 20, y + padding);

    y += 30;
    counter++;
  });

  // Generamos el objeto Blob y la URL de objeto
  const pdfBlob = new Blob([doc.output("arraybuffer")], { type: "application/pdf" });
  const pdfUrl = URL.createObjectURL(pdfBlob);

  // Abrimos la URL de objeto en una nueva pestaña
  window.open(pdfUrl, '_blank');
}

export default GeneratePDF
