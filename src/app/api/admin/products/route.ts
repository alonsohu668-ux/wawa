import {NextRequest, NextResponse} from 'next/server';
import fs from 'fs';
import path from 'path';
import {writeFile} from 'fs/promises';

export const runtime = 'nodejs';

const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

export async function GET() {
  try {
    const productsPath = path.join(process.cwd(), 'src/data/products.json');
    const data = fs.readFileSync(productsPath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({error: 'Failed to read products'}, {status: 500});
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const adminToken = formData.get('adminToken') as string;

    if (ADMIN_TOKEN && adminToken !== ADMIN_TOKEN) {
      return NextResponse.json({error: 'Invalid admin token'}, {status: 401});
    }

    const name = formData.get('name') as string;
    const brand = formData.get('brand') as string || 'EuroDolls';
    const price = parseFloat(formData.get('price') as string);
    const originalPrice = formData.get('originalPrice') ? parseFloat(formData.get('originalPrice') as string) : undefined;
    const material = formData.get('material') as string;
    const height = parseFloat(formData.get('height') as string);
    const weight = parseFloat(formData.get('weight') as string);
    const cupSize = formData.get('cupSize') as string;
    const skinTone = formData.get('skinTone') as string;
    const style = formData.get('style') as string;
    const tags = (formData.get('tags') as string)?.split(',').map(t => t.trim()) || [];
    const description = formData.get('description') as string;
    const badge = formData.get('badge') as string || undefined;
    const images = formData.getAll('images') as File[];

    // Validate image count
    if (images.length < 1) {
      return NextResponse.json({error: 'At least 1 image is required'}, {status: 400});
    }
    if (images.length > 10) {
      return NextResponse.json({error: 'Maximum 10 images allowed per product'}, {status: 400});
    }

    if (!name || !price || isNaN(price) || !height || isNaN(height) || !weight || isNaN(weight)) {
      return NextResponse.json({error: 'Missing or invalid required fields'}, {status: 400});
    }

    // Generate ID from sanitized name
    const sanitizedName = name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    const timestamp = Date.now().toString(36);
    const id = `${sanitizedName}-${timestamp}`;

    // Save images
    const uploadsDir = path.join(process.cwd(), 'public/uploads/products');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, {recursive: true});
    }

    const imagePaths: string[] = [];
    for (const [index, image] of images.entries()) {
      // Generate safe filename: timestamp-random-originalname
      const ts = Date.now();
      const rand = Math.random().toString(36).substring(2, 8);
      const originalExt = path.extname(image.name) || '.jpg';
      const originalNameWithoutExt = path.basename(image.name, originalExt).replace(/[^a-zA-Z0-9.-]/g, '-');
      const filename = `${ts}-${rand}-${originalNameWithoutExt}${originalExt}`;
      const filepath = path.join(uploadsDir, filename);
      const bytes = await image.arrayBuffer();
      await writeFile(filepath, Buffer.from(bytes));
      imagePaths.push(`/uploads/products/${filename}`);
    }

    // Create product object
    const product: any = {
      id,
      brand,
      name: {
        en: name,
        es: name,
        pt: name,
        fr: name,
        de: name,
      },
      description: {
        en: description,
        es: description,
        pt: description,
        fr: description,
        de: description,
      },
      price,
      material,
      height,
      weight,
      cupSize,
      skinTone,
      style,
      tags: tags && tags.length > 0 ? tags : [],
      images: imagePaths,
      inStock: true,
    };

    // Only add optional fields if they have values
    if (originalPrice && !isNaN(originalPrice)) {
      product.originalPrice = originalPrice;
    }
    if (badge) {
      product.badge = badge;
    }

    // Read current products
    const productsPath = path.join(process.cwd(), 'src/data/products.json');
    const data = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

    // Add new product at the beginning
    data.products.unshift(product);

    // Write back
    fs.writeFileSync(productsPath, JSON.stringify(data, null, 2));

    return NextResponse.json({id, ...product}, {status: 201});
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json({error: 'Failed to add product'}, {status: 500});
  }
}