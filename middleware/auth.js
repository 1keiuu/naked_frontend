export default function ({ store, query, redirect }) {
  if (query.token) {
    redirect('/')
    store.$auth.setUserToken(query.token)
  }
}
