const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  panalTypeArray: state => state.app.panalTypeArray,
  company: state => state.user.company,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  id: state => state.user.id
}
export default getters
