const { getItemByQuery, getItemById, getDescriptionById, getCategoryById } = require('../services/items');
const { searchMapper, itemMapper } = require('../mappers/items');

const processItemByQuery2 = async ({ query, limit }) => {
  const response = await getItemByQuery({ query, limit });
  const itemsData = searchMapper(response.results);
  return itemsData;
};

const processItemByQuery = async ({ query, limit }) => {
  const response = await getItemByQuery({ query, limit });
  const itemsData = searchMapper(response.results);

  if (itemsData) {
    const maxCategory = itemsData.categories[0];

    if (maxCategory) {
      const categoryResponse = await getCategoryById(maxCategory);
      itemsData.categories = categoryResponse.path_from_root.map(category => {
        return category.name;
      });
    }
  }
  return itemsData;
};

const processItemById = async itemId => {
  const itemDataResponse = await getItemById(itemId);
  if (itemDataResponse) {
    const descriptionDataResponse = await getDescriptionById(itemId);
    if (descriptionDataResponse) {
      return itemMapper(itemDataResponse, descriptionDataResponse);
    }
  }
};

module.exports = { processItemByQuery, processItemById };
