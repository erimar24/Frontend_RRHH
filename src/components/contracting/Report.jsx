import { jsPDF } from "jspdf";


export function Report(title, reports, vacancy_title) {
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
    doc.line(70, 32, 140, 32);

    //Agregar fecha actual 
    const currentDate = new Date();
    const dateText = `Fecha: ${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

    doc.setFont('Times New Roman', 'normal');
    doc.setFontSize(14);
    doc.text(dateText, 20, 50);
    // Establecer factor de línea
    doc.setLineHeightFactor(1.2);
    doc.text(`Vacante: ${vacancy_title}`, 20, 60);

    // Tomamos solo los primeros 3 objetos del arreglo
    const top3Reports = reports.slice(0, 3);

    //Agregar número de candidatos
    doc.text(`N° de postulantes: ${top3Reports.length}`, 20, 70);
    doc.text(`DETALLES:`, 20, 90)

    //Información del formulario
    doc.setFont('Times New Roman', 'normal');
    doc.setFontSize(13);
    doc.setLineHeightFactor(1.2);

    // Ordenamos el arreglo por puntuación de mayor a menor
    reports.sort((a, b) => b.Qualification - a.Qualification);

    let y = 100;
    const maxY = doc.internal.pageSize.height - 20; // Establecemos la posición máxima en la página
    let counter = 1;

    top3Reports.forEach((report) => {
        if (y > maxY - 80) { // Verificamos si la posición actual excede la posición máxima
            doc.addPage(); // Agregamos una nueva página
            y = 30; // Establecemos la posición y en la nueva página
            // Agregar borde alrededor del documento
            doc.rect(10, 10, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 20, "S");

        }
        
        doc.text(`${counter}. ${report.Candidato} (${report.Qualification}%)`, 25, y);
        doc.text(`Formación académica:`, 30, y + 13)
        doc.text(`Habilidad: ${report.fa_ability}/20`, 30, y + 20);
        doc.text(`Nivel: ${report.fa_level}/20`, 80, y + 20)
        doc.text(`Experiencia:`, 30, y + 33)
        doc.text(`General: ${report.exp_general}/15`, 30, y + 40);
        doc.text(`Específica: ${report.exp_spicify}/30`, 80, y + 40);
        doc.text(`Entrevista:`, 30, y + 53)
        doc.text(`Entrevista: ${report.interview}/20`, 30, y + 60);

        y += 80;
        counter++;
    });

    // Generamos el objeto Blob y la URL de objeto
    const pdfBlob = new Blob([doc.output("arraybuffer")], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Abrimos la URL de objeto en una nueva pestaña
    window.open(pdfUrl, '_blank');
}

export default Report