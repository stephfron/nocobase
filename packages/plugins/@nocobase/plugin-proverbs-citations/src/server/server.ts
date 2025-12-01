/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { InstallOptions, Plugin } from '@nocobase/server';

export class ProverbsCitationsPlugin extends Plugin {
  async beforeLoad() {
    // Register any custom models if needed
  }

  async load() {
    // Register API endpoints for proverbs
    this.app.resource({
      name: 'proverbs',
      actions: {
        async random(ctx, next) {
          const repository = ctx.db.getRepository('proverbs');
          const count = await repository.count();
          if (count === 0) {
            ctx.body = null;
            return next();
          }
          const randomOffset = Math.floor(Math.random() * count);
          const proverb = await repository.findOne({
            offset: randomOffset,
          });
          ctx.body = proverb;
          next();
        },
        async favorites(ctx, next) {
          const repository = ctx.db.getRepository('proverbs');
          const favorites = await repository.find({
            filter: {
              isFavorite: true,
            },
            sort: ['-updatedAt'],
          });
          ctx.body = favorites;
          next();
        },
      },
    });

    // Allow authenticated users to access proverbs
    this.app.acl.allow('proverbs', '*', 'loggedIn');

    // Register snippet for plugin management
    this.app.acl.registerSnippet({
      name: `pm.${this.name}`,
      actions: ['proverbs:*'],
    });
  }

  async install(options: InstallOptions) {
    // Add sample proverbs on install
    const repository = this.db.getRepository('proverbs');

    const existingCount = await repository.count();
    if (existingCount > 0) {
      return;
    }

    const sampleProverbs = [
      {
        content: 'La sagesse commence dans l\'émerveillement.',
        author: 'Socrate',
        source: 'Philosophie grecque',
        category: 'wisdom',
        language: 'fr',
        tags: 'sagesse,philosophie',
        isFavorite: true,
      },
      {
        content: 'The only true wisdom is in knowing you know nothing.',
        author: 'Socrates',
        source: 'Greek Philosophy',
        category: 'wisdom',
        language: 'en',
        tags: 'wisdom,philosophy,humility',
        isFavorite: false,
      },
      {
        content: 'Celui qui déplace une montagne commence par déplacer de petites pierres.',
        author: 'Confucius',
        source: 'Analectes',
        category: 'motivation',
        language: 'fr',
        tags: 'motivation,persévérance',
        isFavorite: true,
      },
      {
        content: 'In the middle of difficulty lies opportunity.',
        author: 'Albert Einstein',
        source: 'Letters',
        category: 'inspiration',
        language: 'en',
        tags: 'inspiration,opportunity,challenges',
        isFavorite: false,
      },
      {
        content: 'Le succès n\'est pas final, l\'échec n\'est pas fatal : c\'est le courage de continuer qui compte.',
        author: 'Winston Churchill',
        source: 'Discours',
        category: 'success',
        language: 'fr',
        tags: 'succès,courage,persévérance',
        isFavorite: true,
      },
    ];

    for (const proverb of sampleProverbs) {
      await repository.create({ values: proverb });
    }

    // Register collection in the collection manager
    const collectionsRepo = this.db.getRepository<any>('collections');
    if (collectionsRepo) {
      await collectionsRepo.db2cm('proverbs');
    }
  }

  async disable() {
    // Cleanup when plugin is disabled
  }
}

export default ProverbsCitationsPlugin;
