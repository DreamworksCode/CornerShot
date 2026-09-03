import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

class ExcelGenerator extends React.Component {
    fetchDataAndDownloadExcel = async () => {``
        try {                                                                                                                                 
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            console.log(data);

            // Process data: Assuming each post has an id, title, and body
            const processedData = data.map(post => ({
                ID: post.id,
                Title: post.title,
                Body: post.body
            }));

            // Create worksheet
            const worksheet = XLSX.utils.json_to_sheet(processedData);


            //Increase the size of cells
            worksheet['!cols']=[
                {width:5},  //Width of the first column (ID)
                {width:20}, //Width of the second column (Title)
                {width:50} //Width of the third column (Body)
            ]

            // Create workbook
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Posts');

            // Convert workbook to binary string
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

            // Convert binary string to Blob
            const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

            // Save blob as a file using FileSaver.js
            saveAs(blob, 'posts.xlsx');

            console.log('Excel file generated successfully.');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    render() {
        return (
            <button onClick={this.fetchDataAndDownloadExcel}>Download Excel</button>
        );
    }
}

export default ExcelGenerator;