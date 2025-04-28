import HTTP from '../http';

const fetchGroups = (userId: number): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      await new Promise((res) => setTimeout(res, 1000))
      resolve([123456789, -100000000])
      // HTTP.get(`/groups/${userId}`).then(response => {
      //   resolve(response.data);
      // }).catch(error => {
      //   reject(error);
      // });
    } catch (error) {
      reject(error);
    }
  })
}

export {
  fetchGroups,
}
