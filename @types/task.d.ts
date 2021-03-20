declare type Task = {
    id?: number,
    user_id?:number,
    title?: string,
    description?: string,
    status?: string,
    starts_date?: string,
    due_date?: string
    completed_date?: string,
    created_at?: Date,
    updated_at?: Date,
    sub_tasks?: SubTask[]
}
