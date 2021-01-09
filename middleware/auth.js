export default function ({ store, query, redirect }) {
  console.log(query)
  if (query.token) {
    redirect('/')
    store.$auth.setUserToken(query.token)
  }
}
