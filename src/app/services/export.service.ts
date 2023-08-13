import { Injectable } from '@angular/core';

const EXCEL_EXTENSION = '.xlsx';
const CSV_EXTENSION = '.csv';
const CSV_TYPE = 'text/plain;charset=utf-8';


@Injectable()
export class ExportService {
  constructor() { }

  /**
    * Creates an array of data to csv. It will automatically generate title row based on object keys.
    *
    * @param rows array of data to be converted to CSV.
    * @param fileName filename to save as.
    * @param columns array of object properties to convert to CSV. If skipped, then all object properties will be used for CSV.
  */
  public exportToCsv(rows: { [key: string]: any }[], fileName: string, columns?: string[]): void {
    if (!rows || !rows.length) {
      return;
    }

    const CSV_EXTENSION = '.csv';
    const CSV_TYPE = 'text/csv;charset=utf-8';

    const separator = ',';
    const keys = Object.keys(rows[0]).filter(k => {
      if (columns?.length) {
        return columns.includes(k);
      } else {
        return true;
      }
    });

    const csvContent =
      keys.join(separator) +
      '\n' +
      rows.map(row => {
        return keys.map(k => {
          let cell: any = row[k] === null || row[k] === undefined ? '' : row[k];
          cell = cell instanceof Date
            ? cell.toLocaleString()
            : cell.toString().replace(/"/g, '""');
          if (cell.search(/("|,|\n)/g) >= 0) {
            cell = `"${cell}"`;
          }
          return cell;
        }).join(separator);
      }).join('\n');

    this.saveAsFile(csvContent, `${fileName}${CSV_EXTENSION}`, CSV_TYPE);
  }

  private saveAsFile(content: string, fileName: string, fileType: string): void {
    const blob = new Blob([content], { type: fileType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  }

}
