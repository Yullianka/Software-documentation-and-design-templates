import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { IOutputStrategy } from '../interfaces/output-strategy.interface';
import * as fs from 'fs';
import * as path from 'path';

interface FirebaseConfig {
  projectId: string;
  collection: string;
  keyFilePath: string;
}

@Injectable()
export class FirebaseOutputStrategy implements IOutputStrategy {
  private readonly logger = new Logger(FirebaseOutputStrategy.name);
  private readonly config: FirebaseConfig;
  private readonly db: admin.firestore.Firestore;
  private readonly buffer: Record<string, string>[] = [];

  constructor() {
    const configPath = path.resolve(process.cwd(), 'config/output.config.json');
    const raw = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    this.config = raw.firebase;

    const keyPath = path.resolve(process.cwd(), this.config.keyFilePath);

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(keyPath),
        projectId: this.config.projectId,
      });
    }

    this.db = admin.firestore();
  }

  async write(data: Record<string, string>): Promise<void> {
    this.buffer.push(data);
  }

  async flush(): Promise<void> {
    if (this.buffer.length === 0) return;

    const BATCH_SIZE = 500; 
    const collection = this.db.collection(this.config.collection);
    let sent = 0;

    for (let i = 0; i < this.buffer.length; i += BATCH_SIZE) {
      const batch = this.db.batch();
      const chunk = this.buffer.slice(i, i + BATCH_SIZE);

      for (const record of chunk) {
        const docRef = collection.doc();
        batch.set(docRef, record);
      }

      await batch.commit();
      sent += chunk.length;
      this.logger.log(
        `Firestore: committed ${sent}/${this.buffer.length} → collection "${this.config.collection}"`,
      );
    }

    this.buffer.length = 0;
  }
}
