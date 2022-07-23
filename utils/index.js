const { PDFDocument, StandardFonts } = require('pdf-lib');

class Utils{
    //calc of age
    calcAge(dateString) {
        var birthday = +new Date(dateString);
        return ~~((Date.now() - birthday) / (31557600000));
    }

    // function that creates pdf
    async handleCreatePdf(
        {
        id,
        name,
        city,
        state,
        mother,
        birthDate,
        sizeShirt,
        sizeShoe,
        sizePants
        }
    ) {
        const pdfDoc = await PDFDocument.create()
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

        const page = pdfDoc.addPage()
        const { width, height } = page.getSize()
        const fontSize = 16;

        page.drawText('Dados Pessoais', {
        x: 10,
        maxWidth: width - (width / 2) - 10,
        y: height - 1.5 * fontSize,
        size: fontSize * 1.5,
        font: timesRomanFont,
        });

        page.drawText(`Nome: ${name}`, {
        x: 10,
        maxWidth: width - (width / 2) - 10,
        y: height - 1.5 * fontSize * 2,
        size: fontSize,
        font: timesRomanFont,
        });
        
        page.drawText(`Idade: ${this.calcAge(birthDate)} anos`, {
        x: 10,
        maxWidth: width - (width / 2) - 10,
        y: height - 1.5 * fontSize * 3,
        size: fontSize,
        font: timesRomanFont,
        });
        
        page.drawText(`Nome da Mãe: ${mother}`, {
        x: 10,
        maxWidth: width - (width / 2) - 10,
        y: height - 1.5 * fontSize * 4,
        size: fontSize,
        font: timesRomanFont,
        });
        
        page.drawText(`Cidade: ${city} , Estado: ${state}`, {
        x: 10,
        maxWidth: width - (width / 2) - 10,
        y: height - 1.5 * fontSize * 5,
        size: fontSize,
        font: timesRomanFont,
        });
        
        page.drawText('Medidas Pessoais', {
        x: 10,
        y: height - 1.5 * fontSize * 7,
        size: fontSize * 1.5,
        font: timesRomanFont,
        });

        page.drawText(`Nº Camiseta: ${sizeShirt}`, {
        x: 10,
        y: height - 1.5 * fontSize * 8,
        size: fontSize,
        font: timesRomanFont,
        });
        
        page.drawText(`Nº Sapato: ${sizeShoe}`, {
        x: 10,
        y: height - 1.5 * fontSize * 9,
        size: fontSize,
        font: timesRomanFont,
        });

        page.drawText(`Nº Calça: ${sizePants}`, {
        x: 10,
        y: height - 1.5 * fontSize * 10,
        size: fontSize,
        font: timesRomanFont,
        });

        const pdfBytes = await pdfDoc.save();
        return pdfBytes;
        // writeFileSync(`./pdfs/output_${id}.pdf`, pdfBytes);
    }
}

module.exports = new Utils();