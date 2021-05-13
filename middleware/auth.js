export default function ({ store, query, redirect }) {
  if (store.$auth.loggedIn) {
    store.$auth.setUserToken(query.token)
    redirect('/')
  }
}
