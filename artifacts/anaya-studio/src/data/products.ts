import p1_main from '@assets/3_1784216835285.jpeg';
import p1_alt from '@assets/2_1784216835284.jpeg';

import p2_main from '@assets/5_1784216835286.jpeg';
import p2_alt from '@assets/6_1784216835285.jpeg';

import p3_main from '@assets/picure_3_n_4_1784216835287.jpeg';
import p3_alt from '@assets/4_1784216835286.jpeg';

import p4_main from '@assets/web_picture_1784216835289.jpeg';
import p4_alt from '@assets/web_picture_2_1784216835288.jpeg';

export type Product = {
  id: string;
  name: string;
  price: number;
  mainImage: string;
  altImages: string[];
  description: string;
  isPlaceholder?: boolean;
};

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Ivory Embroidered Lawn',
    price: 3400,
    mainImage: p1_main,
    altImages: [p1_alt],
    description: 'A masterpiece of subtle elegance. This ivory unstitched 3-piece lawn suit features intricate tonal embroidery on the front, paired with matching trousers and a beautifully composed dupatta. Includes Shirt fabric, Trouser fabric, and Dupatta.',
  },
  {
    id: 'p2',
    name: 'Emerald Noir Printed Lawn',
    price: 2600,
    mainImage: p2_main,
    altImages: [p2_alt],
    description: 'Deep, rich emerald tones balanced with sophisticated print motifs. This unstitched 3-piece lawn suit is a versatile addition to your everyday luxury wardrobe. Includes Shirt fabric, Trouser fabric, and Dupatta.',
  },
  {
    id: 'p3',
    name: 'Blush Pink Embellished Lawn',
    price: 4200,
    mainImage: p3_main,
    altImages: [p3_alt],
    description: 'Soft blush pink tones accented with delicate embellishments and meticulous embroidery. A breathtaking unstitched 3-piece lawn suit designed for refined gatherings. Includes Shirt fabric, Trouser fabric, and Dupatta.',
  },
  {
    id: 'p4',
    name: 'Powder Blue Embroidered Lawn',
    price: 4800,
    mainImage: p4_main,
    altImages: [p4_alt],
    description: 'Ethereal powder blue elevated with heavy, continuous embroidery and a luxurious draped dupatta. A showstopping unstitched 3-piece lawn suit for daytime festivities. Includes Shirt fabric, Trouser fabric, and Dupatta.',
  },
];

export const placeholderProducts: Product[] = [
  {
    id: 'ph1',
    name: 'Midnight Rose Embroidered Lawn',
    price: 3800,
    mainImage: '',
    altImages: [],
    description: 'Deep crimson roses embroidered against a midnight canvas. This dramatic 3-piece unstitched lawn suit is perfect for evening wear. Includes Shirt fabric, Trouser fabric, and Dupatta.',
    isPlaceholder: true,
  },
  {
    id: 'ph2',
    name: 'Opal Mist Printed Lawn',
    price: 2800,
    mainImage: '',
    altImages: [],
    description: 'A cooling opal base overlaid with ethereal floral prints. A breezy, everyday elegant unstitched 3-piece lawn suit. Includes Shirt fabric, Trouser fabric, and Dupatta.',
    isPlaceholder: true,
  },
  {
    id: 'ph3',
    name: 'Tuscan Sun Embroidered Lawn',
    price: 4500,
    mainImage: '',
    altImages: [],
    description: 'Warm gold and ochre threads woven into intricate necklines. A radiant unstitched 3-piece lawn suit. Includes Shirt fabric, Trouser fabric, and Dupatta.',
    isPlaceholder: true,
  },
  {
    id: 'ph4',
    name: 'Sage Silk-Blend Lawn',
    price: 5000,
    mainImage: '',
    altImages: [],
    description: 'Soft sage green with premium silk-blend borders and luxury detailing. A premium unstitched 3-piece lawn suit. Includes Shirt fabric, Trouser fabric, and Dupatta.',
    isPlaceholder: true,
  },
];
