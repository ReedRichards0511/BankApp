import axios from 'axios';

const BASE_URL = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros';


const BankApiURL = axios.create({
  baseURL: BASE_URL,
  headers: {
    'authorId': '0606',
  },
});

export default BankApiURL;
