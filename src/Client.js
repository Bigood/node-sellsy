import ERRORS from './ERRORS';

export default class Client {
  constructor(sellsy) {
    this.udpate = this.upsert;
    this.sellsy = sellsy;
  }
  upsert = data => {
    let method = data.clientid ? 'update':'create';
    return this.sellsy.api({
      method: `Client.${method}`,
      params: data
    }).then(data => {
     if (data.status === 'success') {
        // fetch created customer data
        return this.sellsy.api({
          method: 'Client.getOne',
          params: {
            clientid: data.response.client_id
          }
        }).then(data => data.response.client)
     }
     throw new Error(ERRORS.CUSTOMER_CREATE_ERROR);
    });
  }
  /**
   * Search a client, with an identifier
   * @param {"ident" : "****"} search 
   */
  getFirstMatchWithGetList = search => {
    return this.sellsy.api({
      method: 'Client.getList',
      params: {
        search: search
      }
    }).then(data => {
      if (data.response.infos.nbtotal !== '0') {
        // always return first result
        let keys = Object.keys(data.response.result);
        return data.response.result[keys[0]];
      } else {
        throw new Error(ERRORS.CUSTOMER_NOT_FOUND);
      }
    }).catch(e => {
     throw new Error(ERRORS.CUSTOMER_NOT_FOUND);
    });
  }
}
