export default function ({ store, query, redirect }) {
  console.log(query)
  if (query.token) {
    store.$auth.setUserToken(query.token)
    redirect('/')
  }
}
