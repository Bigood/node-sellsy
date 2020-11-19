import ERRORS from './ERRORS';

export default class Client {
  constructor(sellsy) {
    /**
     * https://api.sellsy.fr/documentation/methodes#clientsupdate
     */
    this.udpate = this.upsert;
    /**
     * https://api.sellsy.fr/documentation/methodes#clientscreate
     */
    this.create = this.upsert;
    this.sellsy = sellsy;
  }
  
  upsert = data => {
    let method = data.clientid ? 'update':'create';
    return this.sellsy.api({
      method: `Client.${method}`,
      params: data
    })
    /**
      {
          "response": {
              "client_id": ***** // Et non clientid, comme on pourrait s'y attendre
          },
          "error": "",
          "status": "success"
      }
     */
    .then(data => {
     if (data.status === 'success') {
       return data.response;
     }
     else{
        console.error(data)
        throw new Error(ERRORS.CUSTOMER_CREATE_ERROR);
     }
    });
  }
  /**
   * Search a client, with an identifier
   * @param {"ident" : "****"} search 
   */
  getList = ({order, search, pagination}) => {
    return this.sellsy.api({
      method: 'Client.getList',
      params: {
        order,
        search,
        pagination,
      }
    }).then(data => {
      return data.response.result;
    }).catch(e => {
      throw new Error(ERRORS.SERVER_ERROR);
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
  /**
   * Get a client with its id
   * @param {string} clientid 
   */
  getOne = clientid => {
    return this.sellsy.api({
      method: 'Client.getOne',
      params: {
        clientid: clientid
      }
    }).then(data => data.response.client)
    .catch(e => {
      throw new Error(ERRORS.CUSTOMER_NOT_FOUND);
    });
  }
}
