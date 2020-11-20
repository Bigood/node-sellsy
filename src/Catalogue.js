
import ERRORS from './ERRORS';

const DEFAULT_GET_LIST_PAGINATION = {
  nbperpage: 100,
  pagenum: 1
}

const DEFAULT_GET_LIST_ORDER = {
  direction: 'ASC',
  order: 'item_name'
}

export default class Document {
  constructor(sellsy) {
    this.sellsy = sellsy;
  }
  getList({type, search, pagination=DEFAULT_GET_LIST_PAGINATION, order=DEFAULT_GET_LIST_ORDER}) {
    return this.sellsy.api({
      method: 'Catalogue.getList',
      params: {
        type,
        search,
        order,
        pagination,
      }
    }).then(data => {
      if (data.status === 'success') {
        return data.response;
      }
      else {
        console.error(data)
        throw new Error(ERRORS.CATALOGUE_NOT_FOUND);
      }
    }).catch(e => {
      console.error(e)
      throw new Error(ERRORS.CATALOGUE_NOT_FOUND);
    });
  }
}
