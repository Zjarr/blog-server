import { IBlog } from '../../blog/schema';
import { ICategory } from '../../category/schema';

const mapCategoriesObject = (ids: string[], categories: ICategory[]): string => {
  return categories
    .filter(category => ids.includes(category._id!))
    .map(category => category.name).join(' | ');
};

export const mapCategories = (blogs: IBlog[], categories: ICategory[]): IBlog[] => {
  return blogs.map(blog => {
    const categoriesString = mapCategoriesObject(blog.categories || [], categories);

    blog.categoriesString = categoriesString || 'No categories';

    return blog;
  });
};
