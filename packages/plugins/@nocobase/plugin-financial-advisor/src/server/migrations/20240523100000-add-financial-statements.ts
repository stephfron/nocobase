import { Migration } from '@nocobase/server';

export default class AddFinancialStatementsCollection extends Migration {
  async up() {
    const collections = [
      {
        name: 'financial_statements',
        title: 'Financial Statements',
        fields: [
          {
            name: 'bank_name',
            type: 'string',
            uiSchema: {
              type: 'string',
              title: 'Bank Name',
              'x-component': 'Select',
              enum: [
                { label: 'BNP Paribas', value: 'bnp' },
                { label: 'Fortuneo', value: 'fortuneo' },
                { label: 'Other', value: 'other' },
              ],
            },
          },
          {
            name: 'statement_file',
            type: 'attachment',
            uiSchema: {
              type: 'array',
              title: 'Statement File',
              'x-component': 'Upload.Attachment',
              'x-component-props': {
                action: 'attachments:create',
              },
            },
          },
          {
            name: 'extracted_text',
            type: 'text',
            uiSchema: {
              type: 'string',
              title: 'Extracted Text',
              'x-component': 'Input.TextArea',
            },
          },
          {
            name: 'ai_advice',
            type: 'text', // Markdown content
            uiSchema: {
              type: 'string',
              title: 'AI Advice',
              'x-component': 'Markdown.Void', // Or Markdown Editor in read-only
            },
          },
        ],
      },
    ];

    await this.db.import({
      directory: 'collections', // unrelated
      items: collections,
    });
  }
}
