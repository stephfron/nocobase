import React from 'react';
import { Instruction } from '@nocobase/plugin-workflow/client';
import { FilePdfOutlined } from '@ant-design/icons';

export class PdfExtractInstruction extends Instruction {
  title = 'PDF Extract';
  type = 'pdf-extract';
  group = 'extended'; // or 'ai' if we want to group it there, but 'extended' or 'collection' is safer
  // @ts-ignore
  icon = (<FilePdfOutlined />);
  fieldset = {
    fileField: {
      type: 'string',
      title: 'File Field',
      name: 'fileField',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '{{ $context.data.file }}',
      },
      description: 'The variable containing the file object or URL.',
    },
  };

  useVariables(node, options) {
    return {
      label: node.title,
      value: node.key,
      children: [
        {
          value: 'text',
          label: 'Extracted Text',
        },
        {
          value: 'numpages',
          label: 'Number of Pages',
        },
      ],
    };
  }
}
