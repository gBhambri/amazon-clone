import axios from 'axios'
const instance=axios.create({
    baseURL:'https://amazon-clone-server.herokuapp.com/'
})
export default instance;