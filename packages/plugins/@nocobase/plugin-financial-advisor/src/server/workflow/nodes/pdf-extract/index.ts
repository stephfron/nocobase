// @ts-nocheck
import { FlowNodeModel, Instruction, JOB_STATUS, Processor } from '@nocobase/plugin-workflow';
import pdf from 'pdf-parse/lib/pdf-parse.js';
import axios from 'axios';

export class PdfExtractInstruction extends Instruction {
  async run(node: FlowNodeModel, input: any, processor: Processor) {
    const { fileField } = node.config;
    // Assume input contains the record with the file field
    // We need to resolve the file URL.
    // In NocoBase, file fields usually contain an object or an array of objects.

    let fileData = processor.getParsedValue(fileField, node.id);

    if (!fileData) {
      // fallback to input itself if it seems to be a file object
      fileData = input;
    }

    // Handle array (multiple files), take the first one for now or handle all
    // For simplicity, let's take the first one if it's an array
    if (Array.isArray(fileData)) {
      fileData = fileData[0];
    }

    if (!fileData || !fileData.url) {
      return {
        status: JOB_STATUS.ERROR,
        result: 'No file URL found in input',
      };
    }

    let url = fileData.url;
    // Handle relative URLs (Local Storage)
    if (url.startsWith('/')) {
      // Try to prepend the app URL if available, otherwise assume localhost:13000
      const appUrl = process.env.APP_URL || 'http://localhost:13000';
      url = `${appUrl}${url}`;
    }

    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const dataBuffer = response.data;
      const data = await pdf(dataBuffer);

      return {
        status: JOB_STATUS.RESOLVED,
        result: {
          text: data.text,
          info: data.info,
          metadata: data.metadata,
          numpages: data.numpages,
        },
      };
    } catch (error) {
      return {
        status: JOB_STATUS.ERROR,
        result: `Failed to parse PDF from ${url}: ${error.message}`,
      };
    }
  }
}
