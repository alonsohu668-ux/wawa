import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const productsPath = join(process.cwd(), 'src', 'data', 'products.json');
    const data = readFileSync(productsPath, 'utf-8');
    
    return NextResponse.json(JSON.parse(data), {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Error reading products:', error);
    return NextResponse.json(
      { error: 'Failed to read products' },
      { status: 500 }
    );
  }
}
