import { NextRequest, NextResponse } from 'next/server';
import { submissionSchema } from '@/app/lib/schema';
import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

/**
 * Persistência simples em arquivo JSON local:
 * - Atende ao requisito de armazenamento (JSON local).
 * - Em produção (ex.: Vercel), trocar por Postgres/Prisma.
 */
const DATA_DIR = path.join(process.cwd(), 'data');
const FILE = path.join(DATA_DIR, 'submissions.json');

async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(FILE);
  } catch {
    await fs.writeFile(FILE, '[]', 'utf-8');
  }
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = submissionSchema.parse(json);

    await ensureDataFile();
    const raw = await fs.readFile(FILE, 'utf-8');
    const items = JSON.parse(raw) as any[];

    const id = randomUUID();
    const now = new Date().toISOString();
    const record = { id, createdAt: now, ...parsed };

    items.push(record);
    await fs.writeFile(FILE, JSON.stringify(items, null, 2), 'utf-8');

    return NextResponse.json({ id }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err?.message || 'Erro inesperado' }, { status: 400 });
  }
}
