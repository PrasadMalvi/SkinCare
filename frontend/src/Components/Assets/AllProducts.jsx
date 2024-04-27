 let allProducts =[
    { 
        id: 1, 
        image: require('./bs1.jpg'), 
        name: 'Matte Lipstick Nude', 
        category: "lips",
        old_price: 250,
        new_price: 180,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."
    },
    { 
        id: 2, 
        image: require('./bs2.jpg'), 
        name: 'Eyeshadow Palette Warm Tones', 
        category: "eye",
        old_price: 350,
        new_price: 280,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 3, 
        image: require('./bs3.jpg'), 
        name: 'Moisturizing Face Mask', 
        category: "face",
        old_price: 150,
        new_price: 120,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 4, 
        image: require('./bs4.jpg'), 
        name: 'Bestseller Foundation', 
        category: "bestseller",
        old_price: 400,
        new_price: 320 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 5, 
        image: require('./bs5.jpg'), 
        name: 'Lip Stain Coral', 
        category: "lips",
        old_price: 200,
        new_price: 150 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 6, 
        image: require('./bs6.jpg'), 
        name: 'Liquid Eyeliner Pen', 
        category: "eye",
        old_price: 180,
        new_price: 140 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 7, 
        image: require('./bs7.jpg'), 
        name: 'Anti-Aging Face Serum', 
        category: "face",
        old_price: 450,
        new_price: 380 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 8, 
        image: require('./bs8.jpg'), 
        name: 'Bestseller Mascara', 
        category: "bestseller",
        old_price: 300,
        new_price: 250 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 9, 
        image: require('./bs1.jpg'), 
        name: 'Glossy Lip Balm', 
        category: "lips",
        old_price: 1200,
        new_price: 900 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 10, 
        image: require('./bs2.jpg'), 
        name: 'Eyebrow Pencil', 
        category: "eye",
        old_price: 1000,
        new_price: 700 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 11, 
        image: require('./bs3.jpg'), 
        name: 'Brightening Face Scrub', 
        category: "face",
        old_price: 200,
        new_price: 160 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 12, 
        image: require('./bs4.jpg'), 
        name: 'Hydrating Lip Scrub', 
        category: "lips",
        old_price: 150,
        new_price: 110 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 13, 
        image: require('./bs5.jpg'), 
        name: 'Eyeshadow Primer', 
        category: "eye",
        old_price: 140,
        new_price: 100 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 14, 
        image: require('./bs6.jpg'), 
        name: 'Setting Spray', 
        category: "face",
        old_price: 250,
        new_price: 200 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 15, 
        image: require('./bs7.jpg'), 
        name: 'Anti-Wrinkle Cream', 
        category: "bestseller",
        old_price: 500,
        new_price: 420 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 16, 
        image: require('./bs8.jpg'), 
        name: 'Long-Wear Foundation', 
        category: "lips",
        old_price: 380,
        new_price: 320 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 17, 
        image: require('./bs1.jpg'), 
        name: 'Lip Plumper', 
        category: "lips",
        old_price: 180,
        new_price: 140 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 18, 
        image: require('./bs2.jpg'), 
        name: 'Waterproof Mascara', 
        category: "eye",
        old_price: 220,
        new_price: 170,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."
 
    },
    { 
        id: 19, 
        image: require('./bs3.jpg'), 
        name: 'Brightening Face Mask', 
        category: "face",
        old_price: 280,
        new_price: 230 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 20, 
        image: require('./bs4.jpg'), 
        name: 'Eyelash Curler', 
        category: "bestseller",
        old_price: 1000,
        new_price: 700,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 21, 
        image: require('./bs5.jpg'), 
        name: 'Matte Lipstick', 
        category: "lips",
        old_price: 200,
        new_price: 160 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 22, 
        image: require('./bs6.jpg'), 
        name: 'Eyebrow Pencil', 
        category: "eye",
        old_price: 1200,
        new_price: 900 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 23, 
        image: require('./bs7.jpg'), 
        name: 'Moisturizing Primer', 
        category: "face",
        old_price: 300,
        new_price: 250 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 24, 
        image: require('./bs8.jpg'), 
        name: 'BB Cream', 
        category: "bestseller",
        old_price: 350,
        new_price: 290 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 25, 
        image: require('./bs1.jpg'), 
        name: 'Lip Gloss', 
        category: "lips",
        old_price: 180,
        new_price: 140 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 26, 
        image: require('./bs2.jpg'), 
        name: 'Liquid Eyeliner', 
        category: "eye",
        old_price: 160,
        new_price: 120 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 27, 
        image: require('./bs3.jpg'), 
        name: 'Anti-Aging Serum', 
        category: "face",
        old_price: 4500,
        new_price: 3800,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."
 
    },
    { 
        id: 28, 
        image: require('./bs4.jpg'), 
        name: 'Highlighter Palette', 
        category: "bestseller",
        old_price: 2800,
        new_price: 2200,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."
 
    },
    { 
        id: 29, 
        image: require('./bs5.jpg'), 
        name: 'Longwear Lipstick', 
        category: "lips",
        old_price: 2500,
        new_price: 2000 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 30, 
        image: require('./bs6.jpg'), 
        name: 'Eyeshadow Palette', 
        category: "eye",
        old_price: 400,
        new_price: 350 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 31, 
        image: require('./bs7.jpg'), 
        name: 'Hydrating Face Mask', 
        category: "face",
        old_price: 1500,
        new_price: 1200,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."
 
    },
    { 
        id: 32, 
        image: require('./bs8.jpg'), 
        name: 'Mascara', 
        category: "bestseller",
        old_price: 220,
        new_price: 180 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 33, 
        image: require('./bs1.jpg'), 
        name: 'Lip Liner', 
        category: "lips",
        old_price: 1000,
        new_price: 800 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 34, 
        image: require('./bs2.jpg'), 
        name: 'Liquid Foundation', 
        category: "face",
        old_price: 300,
        new_price: 250 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 35, 
        image: require('./bs3.jpg'), 
        name: 'Facial Cleanser', 
        category: "bestseller",
        old_price: 1800,
        new_price: 1400 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 36, 
        image: require('./bs4.jpg'), 
        name: 'Contour Kit', 
        category: "face",
        old_price: 32000,
        new_price: 28000,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."
 
    },
    { 
        id: 37, 
        image: require('./bs5.jpg'), 
        name: 'Matte Lipstick Set', 
        category: "lips",
        old_price: 280,
        new_price: 240 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 38, 
        image: require('./bs6.jpg'), 
        name: 'Eyelash Curler', 
        category: "eye",
        old_price: 1200,
        new_price: 1000 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 39, 
        image: require('./bs7.jpg'), 
        name: 'Moisturizing Cream', 
        category: "face",
        old_price: 200,
        new_price: 160 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 40, 
        image: require('./bs8.jpg'), 
        name: 'Highlighter Palette', 
        category: "bestseller",
        old_price: 350,
        new_price: 300 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 41, 
        image: require('./bs1.jpg'), 
        name: 'Lip Gloss', 
        category: "lips",
        old_price: 150,
        new_price: 120 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 42, 
        image: require('./bs2.jpg'), 
        name: 'BB Cream', 
        category: "face",
        old_price: 250,
        new_price: 200 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 43, 
        image: require('./bs3.jpg'), 
        name: 'Makeup Remover Wipes', 
        category: "bestseller",
        old_price: 1000,
        new_price: 800,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 44, 
        image: require('./bs4.jpg'), 
        name: 'Blush Palette', 
        category: "face",
        old_price: 28000,
        new_price: 24000,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."
 
    },
    { 
        id: 45, 
        image: require('./bs5.jpg'), 
        name: 'Eyeshadow Palette', 
        category: "eye",
        old_price: 250000,
        new_price: 200000 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 46, 
        image: require('./bs6.jpg'), 
        name: 'Facial Cleanser', 
        category: "face",
        old_price: 180,
        new_price: 150 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 47, 
        image: require('./bs7.jpg'), 
        name: 'Liquid Eyeliner', 
        category: "eye",
        old_price: 1000,
        new_price: 800 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 48, 
        image: require('./bs8.jpg'), 
        name: 'Mascara', 
        category: "eye",
        old_price: 150,
        new_price: 120 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 49, 
        image: require('./bs1.jpg'), 
        name: 'Tinted Moisturizer', 
        category: "face",
        old_price: 220,
        new_price: 180 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
    { 
        id: 50, 
        image: require('./bs2.jpg'), 
        name: 'Lip Balm', 
        category: "lips",
        old_price: 800,
        new_price: 600 ,
        description : " I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."

    },
]
export default allProducts;
