export interface Destination {
    slug: string;
    name: string;
    image: string;
    shortDescription: string;
}

export const activeDestinations: Destination[] = [
    {
        slug: "bali",
        name: "Bali, Indonesia",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1000",
        shortDescription: "Experience the Island of Gods with pristine beaches and vibrant culture."
    },
    {
        slug: "japan",
        name: "Kyoto & Tokyo, Japan",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1000",
        shortDescription: "A perfect blend of ancient tradition and futuristic innovation."
    },
    {
        slug: "iceland",
        name: "Reykjavik, Iceland",
        image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80&w=1000",
        shortDescription: "Chase the Northern Lights and explore dramatic landscapes."
    },
    {
        slug: "paris",
        name: "Paris, France",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1000",
        shortDescription: "The city of lights, love, art, and exquisite cuisine."
    },
    {
        slug: "santorini",
        name: "Santorini, Greece",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=1000",
        shortDescription: "Iconic white buildings, blue domes, and stunning sunsets."
    },
    {
        slug: "machu-picchu",
        name: "Machu Picchu, Peru",
        image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&q=80&w=1000",
        shortDescription: "Discover the lost city of the Incas high in the Andes mountains."
    }
];
