import { Plugin } from '@nocobase/server';
import { PdfExtractInstruction } from './workflow/nodes/pdf-extract';

export class PluginFinancialAdvisor extends Plugin {
  async load() {
    this.app.on('workflow.register', (workflow) => {
      workflow.registerInstruction('pdf-extract', PdfExtractInstruction);
    });

    // Load migrations
    this.db.addMigrations({
      namespace: 'plugin-financial-advisor',
      directory: __dirname + '/migrations',
      context: {
        plugin: this,
      },
    });
  }
}

export default PluginFinancialAdvisor;
