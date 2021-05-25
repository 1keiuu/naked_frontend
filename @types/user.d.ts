declare type User = {
  id?: number
  email?: string
  name: string
  token?: string
  created_at?: Date
  updated_at?: Date
  avatar_url?: string
  slack_user_id?: string
  tasks?: Task[]
  sub_tasks?: SubTask[]
}
