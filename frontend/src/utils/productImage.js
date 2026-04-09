const CATEGORY_PRODUCT_MAP = {
  'stainless-steel': 'stainless-steel',
  'aluminum': 'aluminum',
  'pipe-products': 'pipe-products',
  'sheet-products': 'sheet-products',
  'black-metal-products': 'black-metal-products',
  'gearboxes': 'gearboxes',
  'gearbox-without-motor': 'gearboxes',
  'conveyor-belts': 'conveyor-belts',
  'conveyor-belt-manufacturing': 'conveyor-belts',
  'restaurant-equipment': 'restaurant-equipment',
  'stainless-containers': 'stainless-containers',
  'milling-machine': 'milling-machine',
  'laser-machine': 'laser-machine',
  'lathe-machine': 'lathe-machine',
  'processing-equipment': 'processing-equipment',
  'pipe-systems': 'pipe-systems',
  'pipeline-fittings': 'pipe-systems',
  'ventilation-systems': 'pipe-systems',
  'metal-products': 'black-metal-products',
  'stainless-metal-products': 'stainless-steel',
  'colored-metal-products': 'aluminum',
  'long-products': 'black-metal-products',
  'shaped-products': 'black-metal-products',
  'metallurgical-raw-materials': 'black-metal-products',
  'shot-blasting': 'processing-equipment',
  'cold-zinc-coating-unit': 'processing-equipment',
  'screw-spiral-blade-machine': 'processing-equipment',
  'building-materials': 'sheet-products',
  'electrical': 'default',
  'equipment': 'processing-equipment',
  'railway-equipment': 'processing-equipment',
  'polymers-ati-rti': 'default',
  'metal-powders': 'default',
};

export const getProductImage = (product) => {
  if (product?.images?.[0]) return product.images[0];
  const catSlug = product?.category?.slug || product?.categorySlug || '';
  const key = CATEGORY_PRODUCT_MAP[catSlug] || 'default';
  return `/products/${key}.svg`;
};
