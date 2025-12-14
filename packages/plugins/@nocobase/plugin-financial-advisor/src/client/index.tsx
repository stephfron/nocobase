// @ts-nocheck
import { Plugin } from '@nocobase/client';
import { PdfExtractInstruction } from './workflow/nodes/pdf-extract';

export class PluginFinancialAdvisorClient extends Plugin {
  async load() {
    this.app.on('workflow.register', (workflow) => {
      workflow.registerInstruction('pdf-extract', PdfExtractInstruction);
    });
  }
}

export default PluginFinancialAdvisorClient;
