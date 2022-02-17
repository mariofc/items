const transform = require('node-json-transform').transform;
const { AUTHOR, ITEM_CONDITION, NO_DISPONIBLE } = require('../config/constants');

const sortCategoriesByIdCountDesc = categories => {
  const categoriesCounts = {};

  categories.forEach(x => {
    categoriesCounts[x] = (categoriesCounts[x] || 0) + 1;
  });

  return Object.keys(categoriesCounts).sort(function(a, b) {
    return categoriesCounts[b] - categoriesCounts[a];
  });
};

const categoryMapper = items => {
  const categories = [];
  items.map(item => {
    return categories.push(item.category_id);
  });
  return sortCategoriesByIdCountDesc(categories);
};

const itemsMapper = (data, isSingleItem) => {
  const map = {
    item: {
      id: 'id',
      title: 'title',
      price: {
        currency: 'currency_id',
        amount: 'price',
        decimals: 'price',
      },
      picture: 'thumbnail',
      condition: 'attributes',
      free_shipping: 'shipping.free_shipping',
      address: 'address.state_name',
    },
    operate: [
      {
        run(val) {
          return Math.trunc(val);
        },
        on: 'price.amount',
      },
      {
        run(val) {
          let num = String(val);
          num = num.indexOf('.') === -1 ? 0 : parseInt(num.substring(num.indexOf('.') + 1, num.length));
          return num;
        },
        on: 'price.decimals',
      },
      {
        run(val) {
          const conditionAttribute = val.filter(attribute => attribute.id === ITEM_CONDITION);
          return conditionAttribute.length === 0 ? NO_DISPONIBLE : conditionAttribute[0].value_name;
        },
        on: 'condition',
      },
    ],
  };

  if (isSingleItem) {
    map.item.sold_quantity = 'sold_quantity';
  }

  return transform(data, map);
};

const itemMapper = (itemData, descriptionData) => {
  itemData;

  const result = {
    author: {
      name: AUTHOR.NAME,
      lastname: AUTHOR.LAST_NAME,
    },
    item: itemsMapper(itemData, true),
  };

  result.item.description = descriptionData && descriptionData.plain_text;

  return result;
};

const searchMapper = items => {
  const result = {
    author: {
      name: AUTHOR.NAME,
      lastname: AUTHOR.LAST_NAME,
    },
    categories: categoryMapper(items),
    items: itemsMapper(items),
  };

  return result;
};

module.exports = { searchMapper, itemMapper };
