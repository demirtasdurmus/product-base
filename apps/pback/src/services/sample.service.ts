import { shared, models } from '@product-base/shared';
import { db } from '../utils/db.js';

export function calculateSample() {
  db.select()
    .from(models.samplesTable)
    .then((sampleModel) => {
      console.log(sampleModel);
    });

  const sharedValue = shared();
  return `Hello, ${sharedValue}!`;
}
