import * as ExcelJS from 'exceljs';


const xldownload = (label: Array<string>, data: Array<{}>) => {


    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('My Sheet');

    worksheet.columns = label.map((element, index) => ({
        header: element,
        key: `col${index + 1}`,
        width: 15
    }))

    data.forEach((rowData) => {
        worksheet.addRow(rowData);
    });

    workbook.xlsx.writeBuffer()
        .then((buffer) => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);

            // Trigger download using a link or anchor element
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'my_file.xlsx');
            link.click();
        })
        .catch((error) => console.error('Error generating buffer:', error));


}

export default xldownload;