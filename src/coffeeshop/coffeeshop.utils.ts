export const processCategories = (category: string) => {
    let categories = [];
    if (category) {
        categories = category.split(',');
    }
    return categories.map((name: string) => {
        let slug = getSlug(name);
        return ({
            where: { slug },
            create: {
                name,
                slug
            }
        });
    });
}

export const getSlug = (category: string) => {
    return category.toLowerCase().replace(' ', '_');
}