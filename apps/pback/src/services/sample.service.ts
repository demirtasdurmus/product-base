import { eq, sql } from 'drizzle-orm';
import { models } from '@product-base/backend';
import { generateRandomString } from '@product-base/shared';
import { db } from '../utils/db.js';

export async function createSample(length?: number) {
  const [sample] = await db
    .insert(models.sample)
    .values({
      name: generateRandomString(length)
    })
    .returning({
      id: models.sample.id,
      name: models.sample.name,
      createdAt: sql<string>`${models.sample.createdAt}`,
      updatedAt: sql<string>`${models.sample.updatedAt}`
    });
  return sample;
}

export async function getSample(id: number) {
  const [sample] = await db
    .select({
      id: models.sample.id,
      name: models.sample.name,
      createdAt: sql<string>`${models.sample.createdAt}`,
      updatedAt: sql<string>`${models.sample.updatedAt}`
    })
    .from(models.sample)
    .where(eq(models.sample.id, id));
  return sample;
}

export async function getSamples(page?: number, limit?: number) {
  if (!page) {
    page = 1;
  }
  if (!limit) {
    limit = 10;
  }

  const samples = await db
    .select({
      id: models.sample.id,
      name: models.sample.name,
      createdAt: sql<string>`${models.sample.createdAt}`,
      updatedAt: sql<string>`${models.sample.updatedAt}`
    })
    .from(models.sample)
    .limit(limit)
    .offset((page - 1) * limit);
  return {
    samples,
    total: samples.length,
    page,
    limit
  };
}

export async function updateSample(id: number, name?: string) {
  const [sample] = await db
    .update(models.sample)
    .set({ name })
    .where(eq(models.sample.id, id))
    .returning({
      id: models.sample.id,
      name: models.sample.name,
      createdAt: sql<string>`${models.sample.createdAt}`,
      updatedAt: sql<string>`${models.sample.updatedAt}`
    });
  return sample;
}

export async function deleteSample(id: number) {
  await db.delete(models.sample).where(eq(models.sample.id, id));
}
