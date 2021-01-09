export default function ({ store, query, redirect }) {
  if (query.token) {
    store.$auth.setUserToken(query.token)
    redirect('/')
  }
}
