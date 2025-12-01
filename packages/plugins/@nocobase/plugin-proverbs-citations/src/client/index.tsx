/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { BookOutlined } from '@ant-design/icons';
import { Plugin, SchemaInitializerItem, SchemaSettings, useSchemaInitializer } from '@nocobase/client';
import { Card, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph, Text } = Typography;

export const ProverbsBlockInitializer = (props) => {
  const { insert } = useSchemaInitializer();
  const { t } = useTranslation();
  return (
    <SchemaInitializerItem
      {...props}
      icon={<BookOutlined />}
      onClick={() => {
        insert({
          type: 'void',
          'x-component': 'CardItem',
          'x-settings': 'ProverbsSettings',
          properties: {
            proverbs: {
              type: 'void',
              'x-component': 'div',
              'x-content': t('Proverbs & Citations Collection'),
            },
          },
        });
      }}
      title={t('Proverbs Block')}
    />
  );
};

const ProverbsPluginSettingPage = () => {
  const { t } = useTranslation();

  return (
    <Card bordered={false}>
      <Title level={3}>
        <BookOutlined /> {t('Proverbs & Citations')}
      </Title>
      <Paragraph>
        {t('This plugin allows you to manage a collection of proverbs, quotes, and citations.')}
      </Paragraph>
      <Title level={4}>{t('Features')}</Title>
      <ul>
        <li>{t('Add, edit, and delete proverbs and citations')}</li>
        <li>{t('Categorize by type (wisdom, inspiration, humor, etc.)')}</li>
        <li>{t('Track sources and authors')}</li>
        <li>{t('Mark favorites')}</li>
        <li>{t('Add tags and notes')}</li>
        <li>{t('Sort and filter your collection')}</li>
      </ul>
      <Title level={4}>{t('Database Configuration')}</Title>
      <Paragraph>
        <Text strong>{t('For Neon PostgreSQL:')}</Text>
      </Paragraph>
      <Paragraph>
        <Text code>
          {`DB_DIALECT=postgres
DB_HOST=your-project-id.region.aws.neon.tech
DB_PORT=5432
DB_DATABASE=your_database
DB_USER=your_username
DB_PASSWORD=your_password
DB_DIALECT_OPTIONS_SSL_REJECT_UNAUTHORIZED=false`}
        </Text>
      </Paragraph>
    </Card>
  );
};

const proverbsSettings = new SchemaSettings({
  name: 'ProverbsSettings',
  items: [
    {
      name: 'remove',
      type: 'remove',
    },
  ],
});

class ProverbsCitationsPlugin extends Plugin {
  async load() {
    // Add the block initializer
    this.app.schemaInitializerManager.addItem('page:addBlock', 'otherBlocks.proverbs', {
      title: '{{t("Proverbs Block")}}',
      Component: ProverbsBlockInitializer,
    });

    // Add plugin settings page
    this.app.pluginSettingsManager.add('proverbs-citations', {
      title: 'Proverbs & Citations',
      icon: 'BookOutlined',
      Component: ProverbsPluginSettingPage,
      sort: 100,
    });

    this.schemaSettingsManager.add(proverbsSettings);
  }
}

export default ProverbsCitationsPlugin;
