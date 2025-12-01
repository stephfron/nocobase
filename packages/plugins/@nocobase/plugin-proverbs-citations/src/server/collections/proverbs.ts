/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { defineCollection } from '@nocobase/database';

export default defineCollection({
  origin: '@nocobase/plugin-proverbs-citations',
  dumpRules: {
    group: 'required',
  },
  name: 'proverbs',
  title: '{{t("Proverbs & Citations")}}',
  sortable: 'sort',
  createdBy: true,
  updatedBy: true,
  logging: true,
  fields: [
    {
      name: 'id',
      type: 'bigInt',
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      uiSchema: {
        type: 'number',
        title: '{{t("ID")}}',
        'x-component': 'InputNumber',
        'x-read-pretty': true,
      },
      interface: 'id',
    },
    {
      interface: 'textarea',
      type: 'text',
      name: 'content',
      uiSchema: {
        type: 'string',
        title: '{{t("Content")}}',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          rows: 4,
        },
      },
    },
    {
      interface: 'input',
      type: 'string',
      name: 'author',
      uiSchema: {
        type: 'string',
        title: '{{t("Author")}}',
        'x-component': 'Input',
      },
    },
    {
      interface: 'input',
      type: 'string',
      name: 'source',
      uiSchema: {
        type: 'string',
        title: '{{t("Source")}}',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: '{{t("Book, speech, article, etc.")}}',
        },
      },
    },
    {
      interface: 'input',
      type: 'string',
      name: 'sourceUrl',
      uiSchema: {
        type: 'string',
        title: '{{t("Source URL")}}',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: 'https://...',
        },
      },
    },
    {
      interface: 'select',
      type: 'string',
      name: 'category',
      uiSchema: {
        type: 'string',
        title: '{{t("Category")}}',
        'x-component': 'Select',
        enum: [
          { label: '{{t("Wisdom")}}', value: 'wisdom' },
          { label: '{{t("Inspiration")}}', value: 'inspiration' },
          { label: '{{t("Humor")}}', value: 'humor' },
          { label: '{{t("Life")}}', value: 'life' },
          { label: '{{t("Love")}}', value: 'love' },
          { label: '{{t("Success")}}', value: 'success' },
          { label: '{{t("Philosophy")}}', value: 'philosophy' },
          { label: '{{t("Motivation")}}', value: 'motivation' },
          { label: '{{t("Other")}}', value: 'other' },
        ],
      },
    },
    {
      interface: 'input',
      type: 'string',
      name: 'language',
      uiSchema: {
        type: 'string',
        title: '{{t("Language")}}',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: 'fr, en, es...',
        },
      },
    },
    {
      interface: 'input',
      type: 'string',
      name: 'tags',
      uiSchema: {
        type: 'string',
        title: '{{t("Tags")}}',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: '{{t("Comma separated tags")}}',
        },
      },
    },
    {
      interface: 'checkbox',
      type: 'boolean',
      name: 'isFavorite',
      defaultValue: false,
      uiSchema: {
        type: 'boolean',
        title: '{{t("Favorite")}}',
        'x-component': 'Checkbox',
      },
    },
    {
      interface: 'textarea',
      type: 'text',
      name: 'notes',
      uiSchema: {
        type: 'string',
        title: '{{t("Notes")}}',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          rows: 2,
        },
      },
    },
    {
      uiSchema: {
        'x-component-props': {
          dateFormat: 'YYYY-MM-DD',
        },
        type: 'datetime',
        title: '{{t("Created at")}}',
        'x-component': 'DatePicker',
        'x-read-pretty': true,
      },
      name: 'createdAt',
      type: 'date',
      field: 'createdAt',
      interface: 'createdAt',
    },
    {
      uiSchema: {
        'x-component-props': {
          dateFormat: 'YYYY-MM-DD',
        },
        type: 'datetime',
        title: '{{t("Last updated at")}}',
        'x-component': 'DatePicker',
        'x-read-pretty': true,
      },
      name: 'updatedAt',
      type: 'date',
      field: 'updatedAt',
      interface: 'updatedAt',
    },
  ],
});
