declare type User = {
  id?: number
  email?: string
  name?: string
  token?: string
  created_at?: Date
  updated_at?: Date
  avatar_url?: string
  avatar?: string
  slack_user_id?: string
  company_id?: string
  tasks?: Task[]
  sub_tasks?: SubTask[]
}
